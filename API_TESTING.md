# API Testing with curl

## Health Check

```bash
curl http://localhost:4000/health
```

## Register a User

```bash
curl -X POST http://localhost:4000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "universityId": "2021-1-60-123",
    "whatsapp": "+880 1712345678",
    "batch": "Spring 2024",
    "github": "johndoe"
  }'
```

## Admin Login

```bash
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure_password_123"
  }'
```

Save the token from response:

```bash
TOKEN="your_jwt_token_here"
```

## Get All Registrations (with pagination)

```bash
curl -X GET "http://localhost:4000/api/admin/registrations?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

## Get Statistics

```bash
curl -X GET http://localhost:4000/api/admin/stats \
  -H "Authorization: Bearer $TOKEN"
```

## Export CSV

```bash
curl -X GET http://localhost:4000/api/admin/export \
  -H "Authorization: Bearer $TOKEN" \
  --output registrations.csv
```

## Delete a Registration

```bash
curl -X DELETE http://localhost:4000/api/admin/registrations/REGISTRATION_ID \
  -H "Authorization: Bearer $TOKEN"
```

## Windows PowerShell Examples

### Register User

```powershell
$body = @{
    name = "John Doe"
    universityId = "2021-1-60-123"
    whatsapp = "+880 1712345678"
    batch = "Spring 2024"
    github = "johndoe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/register" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Admin Login

```powershell
$loginBody = @{
    email = "admin@example.com"
    password = "secure_password_123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $loginBody

$token = $response.token
```

### Get Registrations

```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:4000/api/admin/registrations" `
  -Method Get `
  -Headers $headers
```

### Export CSV

```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/admin/export" `
  -Headers $headers `
  -OutFile "registrations.csv"
```
