from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class WasteCategoryEnum(str, Enum):
    WET = "wet"
    DRY = "dry"
    SANITARY = "sanitary"
    SPECIAL_CARE = "special-care"

class VerificationStatusEnum(str, Enum):
    APPROVED = "APPROVED"
    REQUIRES_REVIEW = "REQUIRES_REVIEW"
    FLAGGED = "FLAGGED"
    REJECTED = "REJECTED"

class VisualFeatures(BaseModel):
    colorVariance: float
    edgeDensity: float
    organicTextureScore: float
    aspectRatio: float

class ClassificationDetails(BaseModel):
    predictedCategory: WasteCategoryEnum
    confidence: float = Field(..., ge=0.0, le=1.0)
    contaminationIndex: float = Field(default=0.0, ge=0.0, le=1.0)
    detectedItems: List[str] = Field(default_factory=list)
    visualFeatures: Optional[VisualFeatures] = None

class VerifyImageRequest(BaseModel):
    imageBase64: Optional[str] = Field(None, description="Base64-encoded image data or data URI")
    imageUrl: Optional[str] = Field(None, description="Optional image URL or path")
    declaredCategory: Optional[str] = Field(None, description="Optional stream declared by resident or collector")

class VerificationResponse(BaseModel):
    success: bool
    classification: ClassificationDetails
    verificationStatus: VerificationStatusEnum
    modelVersion: str
    message: Optional[str] = None
    manualReviewReasons: List[str] = Field(default_factory=list)
