// تأخير عرض العنصر وبدء بعد 8 ثواني
setTimeout(function() {
    document.querySelector('.quest').style.display = 'flex'; // عرض العنصر
}, 8000); // بعد 8 ثوانٍ

// الأسئلة والإجابات والإجابة الصحيحة
var questions = [
    {
        question: "إيه هي القيمه الاساسيه لل Display?",
        choices: ["inline", "block", "inline-block"],
        correctAnswer: "block"
    },
    {
        question: "ايه هي القيمه الاساسيه لل Display الخاص بال Span?",
        choices: ["inline", "inline-block", "block"],
        correctAnswer: "inline"
    },
    {
        question: "ال Position بيستعمل في إيه؟",
        choices: ["نقل العنصر", "تغير لون العنصر", "تغير حجم العنصر"],
        correctAnswer: "نقل العنصر"
    },
    {
        question: "ما هي القيمة الاساسية لل Position?",
        choices: ["absolute", "relative", "static"],
        correctAnswer: "static"
    },
    {
        question: "Position Relative?",
        choices: ["بتنقل العنصر من مكانه الاصلي", "بتثبت العنصر في مكانه", "بتتحرك بالنسبه لحدود الصفحه"],
        correctAnswer: "بتنقل العنصر من مكانه الاصلي"
    },
    {
        question: "إيه هي القيمة الاصليه ل Direction?",
        choices: ["rtl", "ltr", "unset"],
        correctAnswer: "ltr"
    },
    {
        question: "Font-Wight?",
        choices: ["بتغير حجم الخط", "بتغير عرض الخط", "بتغير وزن الخط"],
        correctAnswer: "بتغير وزن الخط"
    },
    {
        question: "بنستعمل إيه علشان نغير اللون الخاص بال div text",
        choices: ["Backgorund-color", "font-color", "color"],
        correctAnswer: "color"
    },
    {
        question: "إيه هو الافضل في الاستعمال في ال images?",
        choices: ["PX", "%", "rem"],
        correctAnswer: "%"
    },
    {
        question: "بنستعمل Background-Repeat-y في إيه؟",
        choices: ["تكرار الخلفية", "تكرار الخلفيه رأسياً", "إيقاف تكرار الخلفيه"],
        correctAnswer: "تكرار الخلفيه رأسياً"
    },
    {
        question: "بنكبر او بنصغر حجم ال Background-size ب ؟",
        choices: ["contain, cover, auto", "px, %", "الاتنين مع بعض"],
        correctAnswer: "الاتنين مع بعض"
    },
    {
        question: "فطرتو إيه النهارده؟ انا مبنجمش إبقي قوليلي علي الواتس.",
        choices: ["إنتا مالك", "فراخ", "مش فاكره"],
        correctAnswer: "إنتا مالك"
    },
    // يمكنك إضافة المزيد من الأسئلة هنا
];

// تعيين متغيرات للتحكم في المؤقت وحالة الاكتمال
var timerInterval;
var timeLeft = 300; // 5 دقائق = 300 ثانية
var answeredQuestions = 0;

// متغيرات لحساب GPA
var correctAnswers = 0;
var totalQuestions = questions.length;

// تحديث عدد السؤال في العنصر span
function updateQuestionNumber() {
    var questionNumberElement = document.getElementById("q-num");
    questionNumberElement.textContent = answeredQuestions + 1;
}

// وظيفة لتحديث المؤقت كل ثانية
function updateTimer() {
    var timer = document.getElementById("timer");
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    timer.textContent = minutes + "m " + seconds + "s";
    timeLeft--;

    // إذا انتهى الوقت، إيقاف المؤقت وعرض النتيجة بدون استكمال الأسئلة
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        timer.textContent = "Time's up!";
        var gpa = (correctAnswers / totalQuestions) * 5.0;
        var gpaElement = document.getElementById("result");
        gpaElement.textContent = gpa.toFixed(1);

        // عرض GPA وفقًا للشروط المحددة
        var gpaContainer = document.querySelector('.GPA');
        gpaContainer.style.display = "flex";
        var resultText = document.getElementById("result-text");
        if (gpa < 3.5) {
            resultText.textContent = "Another Time!";
        } else {
            resultText.textContent = "Congratulations!";
        }

        // تعطيل زر Next بعد الانتهاء
        var nextButton = document.querySelector(".q-btn");
        nextButton.disabled = true;
    }
}

// تحديث عناصر HTML بناءً على السؤال الحالي
function updateQuestion() {
    var currentQuestion = questions[answeredQuestions];
    document.getElementById("q-quest").textContent = currentQuestion.question;
    var choices = currentQuestion.choices;
    for (var i = 0; i < choices.length; i++) {
        var choiceElement = document.getElementById("A" + (i + 1));
        choiceElement.textContent = choices[i];
        choiceElement.previousElementSibling.value = choices[i]; // تحديث قيمة الإجابة
    }
}

// تحديث المؤقت كل ثانية
timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // تحديث الوقت لأول مرة

// عرض السؤال الأول عند تحميل الصفحة وتحديث عدد السؤال
updateQuestion();
updateQuestionNumber();

// التحقق من الإجابة عند الضغط على زر "Next" وتحديث عدد السؤال
var nextButton = document.querySelector(".q-btn");
nextButton.addEventListener("click", function(event) {
    event.preventDefault(); // منع السلوك الافتراضي للزر
    var selectedAnswer = document.querySelector('input[name="Question"]:checked');
    var alertSpan = document.querySelector('.text.alert');
    if (selectedAnswer) {
        var selectedValue = selectedAnswer.value;
        var currentQuestion = questions[answeredQuestions];
        if (selectedValue === currentQuestion.correctAnswer) {
            correctAnswers++; // زيادة عدد الإجابات الصحيحة
        }
        answeredQuestions++; // زيادة عدد الأسئلة التي تم الإجابة عليها
        updateQuestionNumber(); // تحديث عدد السؤال

        // إلغاء تحديد الاختيارات
        document.querySelectorAll('input[name="Question"]').forEach(function(choice) {
            choice.checked = false;
        });

        // إذا تم الإجابة على جميع الأسئلة، قم بحساب GPA وعرض النتيجة
        if (answeredQuestions >= totalQuestions) {
            clearInterval(timerInterval);
            var gpa = (correctAnswers / totalQuestions) * 5.0;
            var gpaElement = document.getElementById("result");
            gpaElement.textContent = gpa.toFixed(1);

            // عرض GPA وفقًا للشروط المحددة
            var gpaContainer = document.querySelector('.GPA');
            gpaContainer.style.display = "flex";
            var resultText = document.getElementById("result-text");
            if (gpa < 3.5) {
                resultText.textContent = "Another Time!";
            } else {
                resultText.textContent = "Congratulations!";
            }

            // تعطيل زر Next بعد الانتهاء
            nextButton.disabled = true;
        } else {
            // تحديث السؤال الحالي
            updateQuestion();
        }
    } else {
        alertSpan.textContent = "Please select an answer before proceeding!";
    }
});
