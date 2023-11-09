from django.contrib.auth.forms import UserCreationForm
from .models import User


class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'name', 'last_name', 'phone_number',)

    def __str__(self):
        return self.name
