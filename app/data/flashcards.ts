import type { Quiz } from "@/app/hooks/useQuiz";

// // Hard-coded sample set (Chinese → Singlish)
// export const HARD_QUIZ: Quiz[] = [
//   {
//     question: "把这句翻成 Singlish：你好",
//     answers: {
//       answer_a: "Hello",
//       answer_b: "Eh bro",              
//       answer_c: "Eh hello",              
//       answer_d: null,
//       answer_e: null,
//       answer_f: null,
//     },
//     correct_answers: {
//       answer_a_correct: "false",
//       answer_b_correct: "false",
//       answer_c_correct: "true",
//       answer_d_correct: "false",
//       answer_e_correct: "false",
//       answer_f_correct: "false",
//     },
//   },
//   {
//     question: "把这句翻成 Singlish：我很累",
//     answers: {
//       answer_a: "I very tired one lah",  
//       answer_b: "I am very tired, ok?",
//       answer_c: "So tired",
//       answer_d: "I also very tired",        
//       answer_e: null,
//       answer_f: null,
//     },
//     correct_answers: {
//       answer_a_correct: "true",
//       answer_b_correct: "false",
//       answer_c_correct: "false",
//       answer_d_correct: "true",
//       answer_e_correct: "false",
//       answer_f_correct: "false",
//     },
//   },
//   {
//     question: "把这句翻成 Singlish：等一下",
//     answers: {
//       answer_a: "Wait first can?",
//       answer_b: "Later then say lah",     
//       answer_c: "Hold on please",
//       answer_d: "Wait ah",
//       answer_e: null,
//       answer_f: null,
//     },
//     correct_answers: {
//       answer_a_correct: "false",
//       answer_b_correct: "true",
//       answer_c_correct: "false",
//       answer_d_correct: "false",
//       answer_e_correct: "false",
//       answer_f_correct: "false",
//     },
//   },
//   {
//     question: "把这句翻成 Singlish：不要担心",
//     answers: {
//       answer_a: "No need worry lah", 
//       answer_b: "Don't worry, friend",
//       answer_c: "Relax can?",
//       answer_d: "Do not worry",
//       answer_e: null,
//       answer_f: null,
//     },
//     correct_answers: {
//       answer_a_correct: "true",
//       answer_b_correct: "false",
//       answer_c_correct: "false",
//       answer_d_correct: "false",
//       answer_e_correct: "false",
//       answer_f_correct: "false",
//     },
//   },
//   {
//     question: "把这句翻成 Singlish：你吃了吗？",
//     answers: {
//       answer_a: "You eat already or not?",
//       answer_b: "Have you eaten?",
//       answer_c: "You makan already?",
//       answer_d: "Eat liao ah?",
//       answer_e: null,
//       answer_f: null,
//     },
//     correct_answers: {
//       answer_a_correct: "true",
//       answer_b_correct: "false",
//       answer_c_correct: "true",
//       answer_d_correct: "false",
//       answer_e_correct: "false",
//       answer_f_correct: "false",
//     },
//   },
// ];

export const HARD_QUIZ: Quiz[] = [
  {
    question: "把这句翻成 Singlish：你好",
    correctAnswers: ["Eh hello"],
  },
  {
    question: "把这句翻成 Singlish：我很累",
    correctAnswers: ["I very tired one lah", "I also very tired"],
  },
  {
    question: "把这句翻成 Singlish：等一下",
    correctAnswers: ["Later then say lah", "Wait ah"],
  },
  {
    question: "把这句翻成 Singlish：不要担心",
    correctAnswers: ["No need worry lah"],
  },
  {
    question: "把这句翻成 Singlish：你吃了吗？",
    correctAnswers: ["You eat already or not?", "You makan already?"],
  },
];