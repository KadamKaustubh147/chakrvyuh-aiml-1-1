from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # in JWTAuthentication --> the raw token is get thru the request header we will take it thru COOKIES
        raw_token = request.COOKIES.get('access_token')

        # copied from the OG JWTAuthentication inherited class
        
        # It checks the JWT signature.
        # Makes sure it’s not expired.
        # Makes sure it hasn’t been tampered with.
        
        if raw_token is None:
            return None
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
