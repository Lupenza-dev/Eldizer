import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import HeaderTab from '../components/HeaderTab';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '../utils/config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
];

const QuestionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();  
  const [isLoading,setIsLoading] =useState(false);

  // Map incoming questions if provided
  let incomingQuestions = route.params?.questions;
  let quizQuestions = questions;
  if (incomingQuestions && Array.isArray(incomingQuestions)) {
    quizQuestions = incomingQuestions.map(q => ({
      id: q.question_id,
      question: q.name,
      options: q.choices,
    }));
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const {userToken} =useContext(AuthContext);

  const handleAnswerSelect = (selectedOption) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: selectedOption,
    });
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // const handleSubmit = () => {
  //   // Calculate score
  //   let correctAnswers = 0;
  //   quizQuestions.forEach((q) => {
  //     if (answers[q.id] === q.correctAnswer) {
  //       correctAnswers++;
  //     }
  //   });
  //   setScore(correctAnswers);
  //   setShowResult(true);
  // };

  const handleSubmit = async () => {

    try {
      setIsLoading(true);
      //alert(route.params?.assignmentId);
      // return;
      // Prepare the submission data
      const submissionData = {
        assignment_id: route.params?.assignmentId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer: answer
        }))
      };
  
      // Make the API call using Axios
      const response = await axios.post(
        `${BASE_URL}/submit-assignment`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          }
        }
      );

      Toast.show({
        type: 'success',
        text1: "You have successfully submitted your quiz",
        position: 'top'
      });
      setIsLoading(false);
      navigation.navigate('AssignMentScreen');
  
      // Update the score based on the API response
      // if (response.data && response.data.score !== undefined) {
      //   setScore(response.data.score);
      // } else {
      //   // Fallback to local calculation if API doesn't return score
      //   let correctAnswers = 0;
      //   quizQuestions.forEach((q) => {
      //     if (answers[q.id] === q.correctAnswer) {
      //       correctAnswers++;
      //     }
      //   });
      //   setScore(correctAnswers);
      // }
      
      // setShowResult(true);
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting assignment:', error);
      const errorMessage = error.response?.data?.message || 'There was an error submitting your answers. Please try again.';
      Alert.alert(
        'Submission Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <>
        <HeaderTab title="Quiz Results" />
        <SafeAreaView style={styles.container}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              You scored {score} out of {quizQuestions.length}
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
              <Text style={styles.resetButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderTab title={`Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`} />
      <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    answers[currentQuestion.id] === option && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswerSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.navigationContainer}>
          {!isFirstQuestion && (
            <TouchableOpacity
              style={[styles.navButton, styles.previousButton]}
              onPress={handlePrevious}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {isLastQuestion ? (
            <TouchableOpacity
              style={[styles.navButton, styles.submitButton]}
              onPress={handleSubmit}
              disabled={!answers[currentQuestion.id]}
            >
              <Text style={styles.navButtonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                !answers[currentQuestion.id] && styles.disabledButton,
              ]}
              onPress={handleNext}
              disabled={!answers[currentQuestion.id]}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <Footer />
    </>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
    color: '#272F3B',
    lineHeight: 32,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    minWidth: 120,
  },
  nextButton: {
    backgroundColor: '#1976d2',
    marginLeft: 'auto',
  },
  previousButton: {
    backgroundColor: '#757575',
    marginRight: 'auto',
  },
  submitButton: {
    backgroundColor: '#388e3c',
    marginLeft: 'auto',
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
    opacity: 0.7,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#272F3B',
  },
  resetButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});