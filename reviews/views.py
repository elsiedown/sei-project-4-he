from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers.common import ReviewSerializer
from .models import Review

class ReviewListView(APIView):
    """ Controller for post request to /reviews endpoint """

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        review_to_create = ReviewSerializer(data=request.data)
        if review_to_create.is_valid():
            review_to_create.save()
            return Response(review_to_create.data, status=status.HTTP_201_CREATED)
        return Response(review_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ReviewDetailView(APIView):
    """ Controller for delete requests to /reviews/id(pk) endpoint """

    permission_classes = (IsAuthenticated, )

    def delete(self, _request, pk):
        try:
            review_to_delete = Review.objects.get(pk=pk)
            review_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            raise NotFound()