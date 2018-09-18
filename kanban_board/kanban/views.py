from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.models import User

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status, viewsets, generics, permissions, filters
from rest_framework.response import Response
from rest_framework.reverse import reverse # reverse function in order to return fully-qualified URLs; 
from rest_framework.views import APIView
from rest_framework.decorators import action

from kanban.models import Board, List, Card, Comment
from kanban.serializers import UserSerializer, CreateUserSerializer, BoardSerializer, ListSerializer, CardSerializer, CommentSerializer

from datetime import datetime


# Create your views here.
class AllBoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    @action(detail=False, methods=['get'])
    def all(self, request):
        """
        Return all Board objects, without pagination
        """
        all_boards = Board.objects.all()

        serialized_boards = BoardSerializer(all_boards, many=True)

        return Response(serialized_boards.data)
    
    @action(detail=True, methods=['get'])
    def lists(self, request, pk=None):

        lists = List.objects.filter(board_id=pk)

        serialized_lists = ListSerializer(lists, many=True)

        return Response(serialized_lists.data)


class AllListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

    @action(detail=False, methods=['get'])
    def all(self, request):
        """
        Return all List objects, without pagination
        """
        all_lists = List.objects.all()

        serialized_lists = ListSerializer(all_lists, many=True)

        return Response(serialized_lists.data)

    @action(detail=True, methods=['get'])
    def cards(self, request, pk=None):

        cards = Card.objects.filter(card_list_id=pk)

        serialized_cards = CardSerializer(cards, many=True)

        return Response(serialized_cards.data)

    @action(detail=True, methods=['post'])
    def post(self, request, *args, **kwargs):
        serializer = ListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # @action(detail=True, methods=['patch'])
    # def patch(self, request, *args, **kwargs):
    #     modified_list = request.data
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllCardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    @action(detail=False, methods=['get'])
    def all(self, request):
        """
        Return all Card objects, without pagination
        """
        all_cards = Card.objects.all()

        serialized_cards = CardSerializer(all_cards, many=True)

        return Response(serialized_cards.data)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):

        comments = Comment.objects.filter(card_id=pk)

        serialized_comments = CommentSerializer(comments, many=True)
        
        return Response(serialized_comments.data)

    @action(detail=True, methods=['post'])
    def post(self, request, *args, **kwargs):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=False, methods=['delete'])
    # def remove_card(self, request, pk=None):
    #     card = self.get_object(pk)
    #     serializer = CardSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllCommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @action(detail=False, methods=['get'])
    def all(self, request):
        """
        Return all Comment objects, without pagination
        """
        all_comments = Comment.objects.all()

        serialized_comments = CommentSerializer(all_comments, many=True)

        return Response(serialized_comments.data)
    
    @action(detail=True, methods=['post'])
    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)