import io
import base64
import pytest
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.waste import WasteCategoryEnum, VerificationStatusEnum

client = TestClient(app)

def create_test_base64_image(color=(34, 139, 34), size=(200, 200)) -> str:
    """Creates a base64 encoded test PNG image."""
    img = Image.new("RGB", size, color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    raw_bytes = buf.getvalue()
    b64 = base64.b64encode(raw_bytes).decode("utf-8")
    return f"data:image/png;base64,{b64}"

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert "SwachhSetu" in data["service"]

def test_verify_wet_waste_image_json():
    # Green/organic dominant image
    b64_img = create_test_base64_image(color=(30, 160, 40))
    response = client.post(
        "/api/v1/verify",
        json={"imageBase64": b64_img, "declaredCategory": "wet"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["classification"]["predictedCategory"] == "wet"
    assert data["classification"]["confidence"] >= 0.50
    assert "swachhsetu-waste" in data["modelVersion"]

def test_verify_dry_waste_image_json():
    # High blue/synthetic dominant image
    b64_img = create_test_base64_image(color=(30, 80, 200))
    response = client.post(
        "/api/v1/verify",
        json={"imageBase64": b64_img, "declaredCategory": "dry"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["classification"]["predictedCategory"] == "dry"

def test_invalid_image_type_rejected():
    response = client.post(
        "/api/v1/verify",
        json={"imageBase64": "invalid_base64_string"}
    )
    assert response.status_code == 400

def test_low_confidence_requires_review():
    # Red visual with declared category 'wet'
    b64_img = create_test_base64_image(color=(220, 20, 60))
    response = client.post(
        "/api/v1/verify",
        json={"imageBase64": b64_img, "declaredCategory": "wet"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["verificationStatus"] in [
        VerificationStatusEnum.REQUIRES_REVIEW.value,
        VerificationStatusEnum.FLAGGED.value
    ]
    assert len(data["manualReviewReasons"]) > 0
