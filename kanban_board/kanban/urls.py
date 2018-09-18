from django.urls import path, include
from rest_framework.routers import DefaultRouter
from kanban import views
from rest_framework import routers

router = DefaultRouter()
router.register('all_boards', views.AllBoardViewSet)
router.register('all_lists', views.AllListViewSet)
router.register('all_cards', views.AllCardViewSet)
router.register('all_comments', views.AllCommentViewSet)


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('api/', include(router.urls)),
    # path('boards/<int:board_id>/lists', views.ListViewSet.as_view({'get': 'list'})),

]