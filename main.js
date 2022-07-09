// 한 글자씩 element에 textArr의 머리 글자를 추가하는 함수
function typingEffect() {
	// let currentTextArr = textArr; // 임시 참조 변수 선언
	introduction.textContent += text.shift(); // 배열의 첫 번째 요소를 꺼내고, element의 content에 추가 (배열 변화 있음)

	if (text.length == 0) {
		// 더 이상 표시할 글자가 없으면, 글자를 지운다.
		setTimeout(deletingEffect, 2500); // 2.5초 이후 deletinfEffect() 호출
	} else {
		// 표시할 글자가 남아있으면 timeInterval 이후 typingEffect() 재귀 호출
		let timeInterval = Math.round(Math.random() * 200); // 난수 생성
		setTimeout(typingEffect, timeInterval); // 재귀 호출
	}
}

function deletingEffect() {
	tempText = introduction.textContent.split(""); // #introduction-text의 글자를 가져온다.
	tempText.pop(); // 마지막 글자 제거
	introduction.textContent = tempText.join(""); // 배열 -> 문자열로 만들어서 다시 #introduction-text 에 표시 (뒷 글자 사라지는 효과)

	if (tempText.length == 0) {
		// 글자를 다 지웠으면, 다음 문장으로 넘어간다.
		getNextText();
	} else {
		// 지울 글자가 남아있으면 timeInterval 이후 deletingEffect() 재귀 호출
		let timeInterval = Math.round(Math.random() * 200); // 난수 생성
		setTimeout(deletingEffect, timeInterval); // 재귀 호출
	}
}

// 다음 문장으로 넘어가는 함수
function getNextText() {
	textIndex = (textIndex + 1) % texts.length; // textIndex가 무한히 texts를 순환
	text = texts[textIndex].split(""); //
	typingEffect();
}

// id를 이용하여 요소의 텍스트 변경
function changeTextById(id, text) {
	let element = document.getElementById(id); // id를 이용하여 요소를 찾는다.
	element.innerText = text; // 요소의 텍스트를 변경
}

// 사용자로부터 변경할 텍스트 입력
function ask() {
	let text = prompt("Who Are You?", ""); // 사용자 입력 프롬프트창
	changeTextById("introduction-text", text); // 입력 텍스트로 요소의 텍스트 변경
}

/* main */
introduction = document.getElementById("introduction-text"); // html 태그 찾기
texts = [
	// #introduction-text 에 표시할 문장들
	"시도하기를 좋아하는 웹 백엔드",
	"기록하기를 좋아하는",
	"공유의 가치를 중시하는",
	"기술의 변화에 흔들리지 않는",
];
textIndex = 0; // texts를 순회하는 인덱스
text = texts[textIndex].split(""); // texts를 순회하며 원소별로 배열화

typingEffect(); // 타이핑 효과 시작