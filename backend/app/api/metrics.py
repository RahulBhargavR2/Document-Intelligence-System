from fastapi import APIRouter

from app.monitoring.metrics import metrics

router = APIRouter()


@router.get("/metrics")
def get_metrics():

    return metrics
