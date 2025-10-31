from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings
import requests


class CustomLoginView(APIView):
    def post(self, request):
        
        username = request.data.get('username')
        password = request.data.get('password')

        # authenticate checks in the db if the given email and password are correct or not
        #! why is request passed
        '''
        Some auth backends might check the request.META (headers).

        Some might check the request to rate-limit or log IP addresses.

        Some custom backends might even look for extra data in the request (like 2FA tokens).
        
        so for safer side pass it
        '''
        user = authenticate(request, username=username, password=password)
        if user is not None:
            res = Response({'message': 'Login successful'})
            # for user method is inherited from Token class --> returns a token here two tokens
            refresh = RefreshToken.for_user(user)
            res.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,  #! True in production
                samesite='None'
            )
            res.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='None'
            )
            return res
        return Response({'error': 'Invalid credentials'}, status=400)

class CustomLogoutView(APIView):
    def post(self, request):
        res = Response({'message': 'Logged out'})
        res.delete_cookie('access_token')
        res.delete_cookie('refresh_token')
        return res

class CustomRefreshView(APIView):
    # solved the fucking refresh token bug
    # DRF sets all APIViews to be login protected so yeah fucker
    authentication_classes = []  # 👈 disables global JWT auth for this view
    permission_classes = [AllowAny]

    def post(self, request):
        # print(request.status, request.text)
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'error': 'No refresh token'}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            res = Response({'message': 'Token refreshed'})
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None'
            )
            return res
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=400)

# class CustomGoogleLoginView(APIView):
#     # permission_classes = [AllowAny]
#     def post(self, request):
#         # ✅ Now we expect a code, not an id_token!
#         code = request.data.get('code')
#         if not code:
#             print("DEBUG: No code received in request!")
#             return Response({'error': 'No authorization code provided'}, status=status.HTTP_400_BAD_REQUEST)

#         # ✅ Exchange code for tokens at Google's OAuth endpoint
#         token_endpoint = 'https://oauth2.googleapis.com/token'
#         payload = {
#             'code': code,
#             'client_id': settings.GOOGLE_CLIENT_ID,
#             'client_secret': settings.GOOGLE_CLIENT_SECRET,
#             'redirect_uri': 'postmessage',  # Must match the one in Google console
#             'grant_type': 'authorization_code',
#         }
#         print("======== DEBUG ========")
#         print(f"Code received: {code}")
#         print(f"Payload being sent: {payload}")
#         print("=======================")

#         token_response = requests.post(token_endpoint, data=payload)
#         print(f"DEBUG: Google token exchange status: {token_response.status_code}")
#         print(f"DEBUG: Google token exchange response: {token_response.text}")

#         if token_response.status_code != 200:
#             print("DEBUG: Failed to exchange code for tokens.")
#             return Response({'error': 'Failed to exchange code for tokens'}, status=status.HTTP_400_BAD_REQUEST)

#         tokens = token_response.json()
#         print(f"DEBUG: Tokens received: {tokens}")

#         id_token_jwt = tokens.get('id_token')
#         if not id_token_jwt:
#             print("DEBUG: No ID token found in token response!")
#             return Response({'error': 'No ID token received from Google'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # ✅ Verify the ID token
#             idinfo = id_token.verify_oauth2_token(
#                 id_token_jwt,
#                 google_requests.Request(),
#                 settings.GOOGLE_CLIENT_ID
#             )
#             print(f"DEBUG: ID token verified: {idinfo}")

#             email = idinfo.get('email')
#             google_id = idinfo.get('sub')
#             print(f"DEBUG: Extracted email: {email}, google_id: {google_id}")

#             if not email or not google_id:
#                 print("DEBUG: Missing email or google_id in ID token payload!")
#                 return Response({'error': 'Invalid Google ID token'}, status=400)

#             # ✅ Get or create user
#             user, created = CustomUser.objects.get_or_create(
#                 email=email,
#                 defaults={
#                     'is_active': True,
#                     'name': idinfo.get('name')  # as this is mandatory field
#                 }
#             )
#             print(f"DEBUG: User created: {created} | User: {user}")

#             if hasattr(user, 'google_id') and not user.google_id:
#                 user.google_id = google_id
#                 user.save()
#                 print("DEBUG: Saved google_id to user.")

#             # ✅ Issue JWT tokens
#             refresh = RefreshToken.for_user(user)
#             res = Response({'message': 'Google login successful'})
#             res.set_cookie(
#                 key='access_token',
#                 value=str(refresh.access_token),
#                 httponly=True,
#                 secure=False,
#                 samesite='Lax'
#             )
#             res.set_cookie(
#                 key='refresh_token',
#                 value=str(refresh),
#                 httponly=True,
#                 secure=False,
#                 samesite='Lax'
#             )
#             print("DEBUG: Tokens issued and cookies set.")
#             return res

#         except ValueError as e:
#             print(f"DEBUG: ID token verification failed: {str(e)}")
#             return Response({'error': f'Invalid Google ID token: {str(e)}'}, status=400)
