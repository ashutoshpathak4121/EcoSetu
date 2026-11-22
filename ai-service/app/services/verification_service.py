from app.schemas.waste import (
    WasteCategoryEnum,
    VerificationStatusEnum,
    ClassificationDetails,
    VerificationResponse
)
from app.models.classifier import WasteImageClassifier
from app.core.config import settings
from typing import Optional, List

class VerificationService:
    def __init__(self):
        self.classifier = WasteImageClassifier(model_version=settings.MODEL_VERSION)

    def verify_waste_image(
        self,
        image_bytes: bytes,
        declared_category: Optional[str] = None
    ) -> VerificationResponse:
        try:
            raw_result = self.classifier.classify(
                image_bytes=image_bytes,
                declared_stream=declared_category
            )

            predicted_cat = raw_result["predictedCategory"]
            confidence = raw_result["confidence"]
            contamination = raw_result["contaminationIndex"]
            detected_items = raw_result["detectedItems"]
            visual_features = raw_result["visualFeatures"]

            manual_review_reasons: List[str] = []
            status = VerificationStatusEnum.APPROVED

            # 1. Low Confidence check
            if confidence < settings.CONFIDENCE_THRESHOLD_REVIEW:
                status = VerificationStatusEnum.REQUIRES_REVIEW
                manual_review_reasons.append(
                    f"Model confidence ({confidence:.2f}) is below standard verification threshold ({settings.CONFIDENCE_THRESHOLD_REVIEW:.2f})."
                )
            elif confidence < settings.CONFIDENCE_THRESHOLD_APPROVED:
                status = VerificationStatusEnum.REQUIRES_REVIEW
                manual_review_reasons.append(
                    f"Moderate confidence ({confidence:.2f}) requires supervisor spot-audit."
                )

            # 2. Contamination check
            if contamination >= settings.CONTAMINATION_THRESHOLD_FLAG:
                status = VerificationStatusEnum.REQUIRES_REVIEW
                manual_review_reasons.append(
                    f"Potential cross-stream contamination detected (index: {contamination:.2f})."
                )

            # 3. Discrepancy between declared category and predicted category
            if declared_category and declared_category.lower().strip() != predicted_cat.value:
                status = VerificationStatusEnum.REQUIRES_REVIEW
                manual_review_reasons.append(
                    f"Declared category '{declared_category}' does not match AI predicted category '{predicted_cat.value}'."
                )

            # 4. Special-care or Sanitary safety flag
            if predicted_cat in [WasteCategoryEnum.SANITARY, WasteCategoryEnum.SPECIAL_CARE] and contamination > 0.08:
                status = VerificationStatusEnum.FLAGGED
                manual_review_reasons.append(
                    "Hazardous or bio-medical waste stream requires manual sanitary inspection protocol."
                )

            classification = ClassificationDetails(
                predictedCategory=predicted_cat,
                confidence=confidence,
                contaminationIndex=contamination,
                detectedItems=detected_items,
                visualFeatures=visual_features
            )

            return VerificationResponse(
                success=True,
                classification=classification,
                verificationStatus=status,
                modelVersion=settings.MODEL_VERSION,
                message="Waste verification processed successfully.",
                manualReviewReasons=manual_review_reasons
            )

        except Exception as e:
            return VerificationResponse(
                success=False,
                classification=ClassificationDetails(
                    predictedCategory=WasteCategoryEnum.DRY,
                    confidence=0.0,
                    contaminationIndex=1.0,
                    detectedItems=["corrupted_image_or_unsupported_format"]
                ),
                verificationStatus=VerificationStatusEnum.REJECTED,
                modelVersion=settings.MODEL_VERSION,
                message=f"Image verification failed: {str(e)}",
                manualReviewReasons=["File format invalid or unreadable image stream."]
            )

verification_service = VerificationService()

