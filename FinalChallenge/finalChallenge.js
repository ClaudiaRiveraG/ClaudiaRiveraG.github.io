function validateInfo(element) {

	var firstName = document.getElementById("fname");
	var lastName = document.getElementById("lname");
	var province = document.getElementById("province");
	var city = document.getElementById("city");


	// variable to contain error message (if any exists)
	var message = "";
	//
	// store topic selection 
	//
	var i;
	var topic = document.getElementsByName("topics");
	var topicSelected;

	for (i = 0; i < topic.length; i++) {
		if (topic[i].checked) {
			topicSelected = topic[i].value;
		}
	}
	//
	// firstname check
	//
	var NameValid = firstName.value;
	var letters = /^[A-Za-z]+$/;
	var boolFirstNameCheck = (NameValid.length > 0) && (NameValid.match(letters));

	if (!boolFirstNameCheck) {
		message += "'First name' is required and should be only letters\n";
		changeClass(firstName, "error");

	} else {
		changeClass(firstName, "");
	}
	//
	//Check last name
	//
	var LNameValid = lastName.value;
	var boolLastNameCheck = (LNameValid.length > 0) && (LNameValid.match(letters));


	if (!boolLastNameCheck) {
		message += "'Last name'is required and should be only letters\n";
		changeClass(lastName, "error");

	} else {
		changeClass(lastName, "");
	}
	//
	//City Check city is letters and is not empty
	//
	var cityValid = document.getElementById("city").value;
	var boolCityCheck = (cityValid.length > 0);

	if (!boolCityCheck) {
		message += "'City' is required\n";
		changeClass(city, "error");

	} else {
		changeClass(city, "");
	}
	//
	//If information is valid then load the quiz
	//
	if (boolFirstNameCheck && boolLastNameCheck && boolCityCheck) {


		if (topicSelected == "Java") {
			loadLocalJ(element);
		}
		if (topicSelected == "Compu") {
			loadLocal(element);
		}

		if (topicSelected == "html") {
			loadLocalH(element);
		}

	}
	else {

		alert(message);

	}

}

function changeClass(field, newValue) {
	field.setAttribute("class", newValue);
}

//
// function to validate content entered by the user
//
function checkField(fieldValue) {
	var check = true;

	fieldValue = fieldValue.trim();

	if (fieldValue.length == 0) {
		check = false;
		return check;
	}

	return check;
}

var answers;
//
//Read Jason for Programming topics
//
function loadLocal(element) {
	var i, j, quizContent= "";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObject = JSON.parse(this.responseText);
			var answer = jsonObject.finalquiz.rightanswers;
			answers = answer.split(",");
			for (i in jsonObject.finalquiz.question) {
				quizContent += "<p><b>" + jsonObject.finalquiz.question[i].qnumber + ". " + jsonObject.finalquiz.question[i].qtitle + "</b></p>";
				quizContent += "<p><input type=\"radio\" name=\"question" + i + "\" value=\"a\">a. " + jsonObject.finalquiz.question[i].a + "<br>";
				quizContent += "<input type=\"radio\" name=\"question" + i + "\" value=\"b\">b. " + jsonObject.finalquiz.question[i].b + "<br>";
				quizContent += "<input type=\"radio\" name=\"question" + i + "\" value=\"c\">c. " + jsonObject.finalquiz.question[i].c + "<br>";
				quizContent += "<input type=\"radio\" name=\"question" + i + "\" value=\"d\">d. " + jsonObject.finalquiz.question[i].d + "<br>";
			}

			document.getElementById("test").style.visibility = "visible"; //Make the button submit answer visible
			document.getElementById("quiz").innerHTML =  quizContent;
		}
	};
	xhttp.open("GET", "content/finalquiz.json", true);
	xhttp.send();

}
//
// read JSON for Java topics
//
function loadLocalJ(element) {
	var i, j, x = "";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObject = JSON.parse(this.responseText);
			var answer = jsonObject.javaquiz.rightanswers;
			answers = answer.split(",");
			for (i in jsonObject.javaquiz.question) {
				x += "<p></b>" + jsonObject.javaquiz.question[i].qnumber + ". " + jsonObject.javaquiz.question[i].qtitle + "</b></p>";
				x += "<p><input type=\"radio\" name=\"question" + i + "\" value=\"a\">a. " + jsonObject.javaquiz.question[i].a + "<br>";
				x += "<input type=\"radio\" name=\"question" + i + "\" value=\"b\">b. " + jsonObject.javaquiz.question[i].b + "<br>";
				x += "<input type=\"radio\" name=\"question" + i + "\" value=\"c\">c. " + jsonObject.javaquiz.question[i].c + "<br>";
				x += "<input type=\"radio\" name=\"question" + i + "\" value=\"d\">d. " + jsonObject.javaquiz.question[i].d + "<br>";
			}

			document.getElementById("test").style.visibility = "visible"; //Make the button submit answer visible
			document.getElementById("quiz").innerHTML = x;
		}
	};
	xhttp.open("GET", "content/javaquiz.json", true);
	xhttp.send();

}

//
// read JSON for HTML topics
//
function loadLocalH(element) {
	// check if user selects an answer
	var checkRadio1 = document.querySelector('input[name="question0"]:checked');
	var checkRadio2 = document.querySelector('input[name="question1"]:checked');
	var checkRadio3 = document.querySelector('input[name="question2"]:checked');
	var checkRadio4 = document.querySelector('input[name="question3"]:checked');
	var checkRadio5 = document.querySelector('input[name="question4"]:checked');

	var i, j, x = "";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObject = JSON.parse(this.responseText);
			var answer = jsonObject.htmlquiz.rightanswers;
			answers = answer.split(",");
			for (i in jsonObject.htmlquiz.question) {
				x += "<p><b>" + jsonObject.htmlquiz.question[i].qnumber + ". " + jsonObject.htmlquiz.question[i].qtitle + "</b></p>";
				x += "<p><input type=\"radio\" name=\"question" + i + "\" value=\"a\">a. " + jsonObject.htmlquiz.question[i].a + "<br>";
				x += "<input type=\"radio\" name=\"question" + i + "\" value=\"b\">b. " + jsonObject.htmlquiz.question[i].b + "<br>";
				x += "<input type=\"radio\" name=\"question" + i + "\" value=\"c\">c. " + jsonObject.htmlquiz.question[i].c + "<br>";
				x += "<input type=\"radio\" name=\"question" + i + "\" value=\"d\">d. " + jsonObject.htmlquiz.question[i].d + "<br>";
			}

			document.getElementById("test").style.visibility = "visible"; //Make the button submit answer visible
			document.getElementById("quiz").innerHTML = x;

		}
	};
	xhttp.open("GET", "content/htmlquiz.json", true);
	xhttp.send();
}

function checkGraded() {
	//Check if all questions have been answered
	var i;
	for (i = 0; i <= 4; i++) {
		checkRadio = document.querySelector('input[name="question' + i + '"]:checked');
		var question = i+1;
		if (checkRadio == null ){
			alert("Question" + question + ":  please select an answer");
		}
	}
	
	var checkRadio1 = document.querySelector('input[name="question0"]:checked');
	var checkRadio2 = document.querySelector('input[name="question1"]:checked');
	var checkRadio3 = document.querySelector('input[name="question2"]:checked');
	var checkRadio4 = document.querySelector('input[name="question3"]:checked');
	var checkRadio5 = document.querySelector('input[name="question4"]:checked');
	if (checkRadio1 != null && checkRadio2 != null && checkRadio3 != null && checkRadio4 != null && checkRadio5 != null) {
		
		graded()
	}


}

function graded() {

	var firstName = document.getElementById("fname").value;
	var lastName = document.getElementById("lname").value;
	var province = document.getElementById("province").value;
	var city = document.getElementById("city").value;
	var i;
	var val1 = document.getElementsByName('question0');
	var val2 = document.getElementsByName('question1');
	var val3 = document.getElementsByName('question2');
	var val4 = document.getElementsByName('question3');
	var val5 = document.getElementsByName('question4');

	// question 1

	for (i = 0; i < val1.length; i++) {
		if (val1[i].checked) {
			var ans1 = val1[i].value;
			break
		}
		else
			ans1 = 'x';
	}
	// question 2

	for (i = 0; i < val2.length; i++) {
		if (val2[i].checked) {
			var ans2 = val2[i].value;
			break;
		}
		else {
			ans2 = 'x';
		}
	}

	// question 3

	for (i = 0; i < val3.length; i++) {
		if (val3[i].checked) {
			var ans3 = val3[i].value;
			break;
		}
		else
			ans3 = 'x';
	}

	// question 4

	for (i = 0; i < val4.length; i++) {
		if (val4[i].checked) {
			var ans4 = val4[i].value;
			break;
		}
		else
			ans4 = 'x';
	}

	// question 5

	for (i = 0; i < val5.length; i++) {
		if (val5[i].checked) {
			var ans5 = val5[i].value;
			break;
		}
		else
			ans5 = 'x';
	}
	var total = 0;
	var ansVer = answers[0];
	if (ans1 == (ansVer)) {
		total += 1
	}
	var ansVer = answers[1];
	if (ans2 == ansVer) {
		total += 1
	}
	var ansVer = answers[2];
	if (ans3.match(ansVer)) {
		total += 1
	}
	var ansVer = answers[3];
	if (ans4.match(ansVer)) {
		total += 1
	}
	var ansVer = answers[4];
	if (ans5.match(ansVer)) {
		total += 1
	}

	var result = (total / 5) * 100;
	if (result >= 50 && result < 80) {
		var mess = "Great Job!"
	}

	if (result < 50) {
		var mess = "You need to study more"
	}

	if (result >= 80 && result <= 100) {
		var mess = "Excellent! You got it!"
	}

	var txt = "<h2>Quiz Results</h2><hr>" + "<p>" + result + "%" + "(" + total + "/5 correct) </p>" + "<b>" + mess + "</b><br><p>" + firstName + " " + lastName + "<br>" + city + ", " + province + "</p";
	document.getElementById("results").innerHTML = txt;

	return false;
}









