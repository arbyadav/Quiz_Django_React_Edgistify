from rest_framework import generics, permissions, status, viewsets
from knox.models import AuthToken
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer, QuizSerializer, ResponseSerializer, QuizTakersSerializer
from rest_framework.response import Response
from .models import Quiz, QuizTakers, Response as ResponseModel, Answer, Question

# Create your views here.


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class QuizzesAPI(generics.ListAPIView):
    lookup_field = 'slug'
    queryset = Quiz.objects.filter(roll_out=True)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = QuizSerializer

    # def get(self,request):
    #     serializer = QuizSerializer(self.get_queryset(),many=True)
    #     return Response(serializer.data)

    def get_queryset(self, *args, **kwargs):
        queryset_list = Quiz.objects.all()
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(name__icontains=query) | Q(description__icontains=query)).distinct()
        # serializer = BookSerializer(self.get_queryset(),many=True)
        return queryset_list


class QuizDetailAPI(generics.GenericAPIView):
    lookup_field = 'slug'
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        slug = self.kwargs['slug']
        try:
            quiz = Quiz.objects.get(slug=slug)
            obj, created = QuizTakers.objects.get_or_create(
                user=self.request.user, quiz=quiz)
            if created:
                for question in Question.objects.filter(quiz=quiz):
                    ResponseModel.objects.create(
                        quiztaker=obj, question=question)
        except Quiz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({'quiz': QuizSerializer(quiz, context={'request': self.request}).data})

    def post(self, request, *args, **kwargs):
        quiztaker_id = request.data['quiztaker']
        question_id = request.data['question']
        answer_id = request.data['answer']
        slug = self.kwargs['slug']
        quiz = Quiz.objects.get(slug=slug)
        obj_check = QuizTakers.objects.get(user=self.request.user, quiz=quiz)
        if obj_check.completed == True:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if answer_id is not None:
            quiztaker = QuizTakers.objects.get(id=quiztaker_id)
            question = Question.objects.get(id=question_id)
            answer = Answer.objects.get(id=answer_id)
            obj = ResponseModel.objects.get(
                quiztaker=quiztaker, question=question)
            obj.answer = answer
            obj.save()

        obj = QuizTakers.objects.get(user=self.request.user, quiz=quiz)
        obj.completed = True
        correct_counter = 0
        for item in ResponseModel.objects.filter(quiztaker=obj):
            try:
                answer = Answer.objects.get(
                    question=item.question, is_correct=True)
                if item.answer == answer:
                    correct_counter += 1
            except Answer.DoesNotExist:
                another_answer = Answer.objects.filter(
                    question=item.question).first()
                another_answer.is_correct = True
                another_answer.save()
                if item.answer == another_answer:
                    correct_counter += 1
        obj.correct_answers = correct_counter
        obj.save()

        return Response({'quiz': QuizSerializer(quiz, context={'request': self.request}).data})


class ResponseAPI(generics.GenericAPIView):
    queryset = ResponseModel.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ResponseSerializer

    def post(self, request, *args, **kwargs):
        quiztaker_id = request.data['quiztaker']
        question_id = request.data['question']
        answer_id = request.data['answer']

        quiztaker = QuizTakers.objects.get(id=quiztaker_id)
        question = Question.objects.get(id=question_id)
        answer = Answer.objects.get(id=answer_id)
        obj = ResponseModel.objects.get(quiztaker=quiztaker, question=question)
        obj.answer = answer
        obj.save()
        return Response(ResponseSerializer(obj).data)


class QuizResultAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = QuizTakersSerializer

    def get(self, *args, **kwargs):
        slug = self.kwargs['slug']
        try:
            quiz = Quiz.objects.get(slug=slug)
            try:
                quiztaker = QuizTakers.objects.get(
                    user=self.request.user, quiz=quiz)
                if not quiztaker.completed:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            except QuizTakers.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except Quiz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({'quiz': QuizSerializer(quiz, context={'request': self.request}).data})

    def post(self, *args, **kwargs):
        slug = self.kwargs['slug']
        try:
            quiz = Quiz.objects.get(slug=slug)
            try:
                quiztaker = QuizTakers.objects.filter(
                    user=self.request.user, quiz=quiz).delete()
            except QuizTakers.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except Quiz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({'quiz': QuizSerializer(quiz, context={'request': self.request}).data})


# class QuizViewSet(viewsets.ModelViewSet):

#     serializer_class = QuizSerializer
#     queryset = Quiz.objects.all()


# class UserView(RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated, ]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user


# class UserDetailView(RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated, ]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
