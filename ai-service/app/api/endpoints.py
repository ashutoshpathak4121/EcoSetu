import base64
import re
from fastapi import APIRouter, HTTPException, Request
from typing import Optional
from app.schemas.waste import VerificationResponse, VerifyImageRequest
from app.services.verification_service import verification_service

router = APIRouter(prefix="/api/v1", tags=["AI Waste Verification"])

def decode_base64_image(base64_str: str) -> bytes:
    """Decodes standard base64 or data URI."""
    if "," in base64_str:
        base64_str = base64_str.split(",", 1)[1]
    # Remove any stray newlines or whitespace
    clean_b64 = re.sub(r"\s+", "", base64_str)
    return base64.b64decode(clean_b64)

@router.post("/verify", response_model=VerificationResponse)
async def verify_waste_json(request: VerifyImageRequest):
    """
    Analyzes waste photograph via JSON base64 payload.
    Supports 4 categories: Wet, Dry, Sanitary, and Special-Care.
    """
    if not request.imageBase64:
        raise HTTPException(
            status_code=400,
            detail="Field 'imageBase64' is required for AI verification."
        )

    try:
        image_bytes = decode_base64_image(request.imageBase64)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid base64 image data: {str(e)}"
        )

    if len(image_bytes) < 100:
        raise HTTPException(
            status_code=400,
            detail="Image content is too small or corrupted."
        )

    if len(image_bytes) > 15 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Image size exceeds maximum threshold of 15 MB."
        )

    response = verification_service.verify_waste_image(
        image_bytes=image_bytes,
        declared_category=request.declaredCategory
    )
    return response

@router.post("/verify/raw", response_model=VerificationResponse)
async def verify_waste_raw(request: Request, declared_category: Optional[str] = None):
    """
    Accepts raw image binary stream in request body.
    """
    image_bytes = await request.body()
    if len(image_bytes) < 100:
        raise HTTPException(
            status_code=400,
            detail="Image content is too small or empty."
        )

    response = verification_service.verify_waste_image(
        image_bytes=image_bytes,
        declared_category=declared_category
    )
    return response

@router.get("/health")
async def health_check():
    return {
        "status": "HEALTHY",
        "service": "EcoSetu AI Verification Microservice",
        "version": "2.1.0",
        "model": "ecosetu-waste-v2.1"
    }
