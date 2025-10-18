import json
import os
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create YooMoney payment for furry performer booking
    Args: event - dict with httpMethod, body (amount, description, performer_name, customer_email)
          context - object with request_id
    Returns: HTTP response with payment confirmation URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    amount = body_data.get('amount')
    description = body_data.get('description', 'Заказ услуги')
    performer_name = body_data.get('performer_name', '')
    customer_email = body_data.get('customer_email', '')
    
    if not amount:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Amount is required'}),
            'isBase64Encoded': False
        }
    
    shop_id = os.environ.get('YOOMONEY_SHOP_ID', '')
    secret_key = os.environ.get('YOOMONEY_SECRET_KEY', '')
    
    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Payment credentials not configured'}),
            'isBase64Encoded': False
        }
    
    payment_id = str(uuid.uuid4())
    
    return_url = 'https://your-domain.com/payment-success'
    
    payment_url = f'https://yoomoney.ru/quickpay/confirm.xml?receiver={shop_id}&quickpay-form=shop&targets={description}&paymentType=PC&sum={amount}&label={payment_id}'
    
    payment_data = {
        'payment_id': payment_id,
        'payment_url': payment_url,
        'amount': amount,
        'description': description,
        'performer_name': performer_name,
        'customer_email': customer_email,
        'status': 'pending'
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(payment_data),
        'isBase64Encoded': False
    }
