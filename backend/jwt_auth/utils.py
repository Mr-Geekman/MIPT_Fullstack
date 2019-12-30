from .serializers import CurrentUserSerializer


def jwt_token_response_handler(token, user=None, request=None):
    """Обработчик при получении токена.

    Делаем так, чтобы мы помимо самого токена получили еще и пользователя,
    чтобы не ходить в бэкенд лишний раз.
    """
    return {
        'token': token,
        'user': CurrentUserSerializer(user, context={'request': request}).data
    }
