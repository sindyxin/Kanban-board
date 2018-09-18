from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import serializers
import kanban.serializer_utils as serializer_utils
from kanban.models import Board, List, Card, Comment

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_user_full_name')

    def get_user_full_name(self, user_object):
        return serializer_utils.get_user_full_name(user_object)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'full_name', 'email')

class CreateUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']

        # Each user signs up with their 2G Digital email, which is always 'firstname.lastname@2gdigital.com'
        # The username is simply the user's 'firstname.lastname'.
        first_name, last_name = username.split('.')
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()

        # Lowercase the username
        username = username.lower()

        user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)

        return user

    class Meta:
        model = User
        fields = '__all__'


class BoardSerializer(serializers.ModelSerializer):
    lists = serializers.PrimaryKeyRelatedField(queryset=List.objects.all(), many=True)

    class Meta:
        model = Board
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(queryset=Card.objects.all(), many=True)
    
    class Meta:
        model = List
        fields = '__all__'

    # def update(self, instance, validated_data):
    #     lists = validated_data['lists']

    #     for list in lists:
    #         list_object = List.objects.get(pk=list.get('id'))
    #         list_object.name = list.get('name')
    #         list_object.save()

    #     return instance




class CardSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(), many=True)
    
    class Meta:
        model = Card
        fields = '__all__'

    # def update(self, instance, validated_data):
    #     cards = validated_data['cards']

    #     for card in cards:
    #         card_object = Card.objects.get(pk=card.get('id'))
    #         card_object.name = card.get('name')
    #         card_object.save()

    #     return instance

class CommentSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Comment
        fields = '__all__'
