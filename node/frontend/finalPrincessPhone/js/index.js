

let phoneInput = document.getElementById('phoneText');
let AgreeCheck = document.getElementById('agreeCheck');
const selectRegions = document.querySelectorAll('.selectRegion');
const commitPhoneElement = document.getElementById('commit');
const phoneRegex = {
  TW: /^[0-9]{9}$/,
  HK: /^[0-9]{8}$/,
  MO: /^[0-9]{8}$/,
  JP: /^[0-9]{10}$/,
  KR: /^[0-9]{10,11}$/,
  VN: /^(\+84|0[1-9])[0-9]{8,10}$/,
  KH: /^(\+855|0[1-9])[0-9]{8,9}$/,
  TH: /^(\+66|0[1-9])[0-9]{8,9}$/,
  MM: /^(\+95|0[1-9])[0-9]{6,8}$/,
  MY: /^(\+60|0[1-9])[0-9]{7,9}$/,
  SG: /^(\+65|0[1-9])[0-9]{7,10}$/,
  ID: /^(\+62|0[1-9])[0-9]{7,10}$/,
  PH: /^(\+63|0[1-9])[0-9]{7,10}$/,
  IN: /^(\+91|0[1-9])[0-9]{9,10}$/
};
// 手机号输入监听器
phoneInput.addEventListener('input', (event) => {
  if (event.target.value.length > 11) {
    event.target.value = event.target.value.slice(0, 11);
  }
  event.target.value = event.target.value.replace(/\D/g, '');
});


//
selectRegions.forEach((region, index) => {
  region.addEventListener('click', () => {
    const selectedValue = region.getAttribute('value');
    const selectedText = region.textContent.trim();
    selectRegions[0].setAttribute('value', selectedValue);
    selectRegions[0].textContent = selectedText;
    
  });
});
//
document.addEventListener('DOMContentLoaded', () => {
  const languages = document.querySelectorAll('.language');
  const firstLanguage = languages[0];

  languages.forEach((language) => {
    language.addEventListener('click', () => {
      // 获取被点击元素的语言代码
      const clickedLang = language.dataset.lang;

      // 将第一个元素的语言代码更新为被点击元素的语言代码
      firstLanguage.dataset.lang = clickedLang;
      firstLanguage.textContent = language.textContent;
    });
  });
});
function alertError(category,lang){
  if(category===0){
    if(lang==='zh-TW'){
      alert('手機號爲空!');
    }else if(lang==='en'){
      alert('The mobile phone number cannot be empty!');
    }else if(lang==='ko'){
      alert('휴대폰 번호는 비워 둘 수 없습니다！');
    }else if(lang==='ja'){
      alert('手机番号が空です');
    }
  }else if(category===1){
    if(lang==='zh-TW'){
      alert('手機號格式錯誤!');
    }else if(lang==='en'){
      alert('The phone number is in the wrong format!');
    }else if(lang==='ko'){
      alert('전화 번호의 형식이 잘못되었습니다！');
    }else if(lang==='ja'){
      alert('電話番号の形式が間違っている!');
    }
  }
  else if(category===2){
    if(lang==='zh-TW'){
      alert('請同意服務條款!');
    }else if(lang==='en'){
      alert('Please agree to the Terms of Service!');
    }else if(lang==='ko'){
      alert('서비스 약관에 동의하십시오！');
    }else if(lang==='ja'){
      alert('利用規約に同意してください!');
    }
  }
  else if(category===3){
    if(lang==='zh-TW'){
      alert('請選擇地區！');
    }else if(lang==='en'){
      alert('Please select a region！');
    }else if(lang==='ko'){
      alert('지역을 선택해 주세요！');
    }else if(lang==='ja'){
      alert('地域を選択してください！');
    }
  }
  else if(category===4){
    if(lang==='zh-TW'){
      alert('本手機號碼已完成預約!');
    }else if(lang==='en'){
      alert('This mobile phone number has completed the reservation！');
    }else if(lang==='ko'){
      alert('이 휴대폰 번호로 예약이 완료되었습니다！');
    }else if(lang==='ja'){
      alert('この携帯電話番号は予約を完了しました!');
    }
  }
}

// 提交按钮点击事件监听器
commitPhoneElement.addEventListener('click', () => {
  // 检查复选框是否被勾选
  // 检查手机号格式
  let phoneValue = phoneInput.value;
  if (phoneValue==='') {
     alertError(0,lang);
    return;
  }  

  if (isNaN(phoneValue)) {
    alertError(1,lang)
    return;
  }

  // 检查下拉框选择情况
  let selectedRegion = selectRegions[0].getAttribute('value');
  if (selectedRegion === 'none') {
    alertError(3, lang);
    return;
  }
  
  if (selectedRegion === "886") {
    if (!phoneRegex.TW.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "852") {
    if (!phoneRegex.HK.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "853") {
    if (!phoneRegex.MO.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "81") {
    if (!phoneRegex.JP.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "82") {
    if (!phoneRegex.KR.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "84") {
    if (!phoneRegex.VN.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "855") {
    if (!phoneRegex.KH.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "66") {
    if (!phoneRegex.TH.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "95") {
    if (!phoneRegex.MM.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "60") {
    if (!phoneRegex.MY.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "65") {
    if (!phoneRegex.SG.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "62") {
    if (!phoneRegex.ID.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "63") {
    if (!phoneRegex.PH.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  if (selectedRegion === "91") {
    if (!phoneRegex.IN.test(phoneValue)) {
      alertError(1, lang);
      return;
    }
  }
  

  let isAgreeCheck = AgreeCheck.checked;
  console.log('isAgreeCheck:', isAgreeCheck);
   if(!isAgreeCheck){
    alertError(2,lang)
    return;
   }
  // 所有检查通过后,执行提交操作

  // 在这里添加您的提交逻辑
  fetch('https://register.princesscantdefend.com/api/commitPhone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify({ region: selectedRegion, phone: phoneValue })
  })
  .then(response => response.json())
  .then(data => {
   
    if(data.code!==200){
      alertError(4,lang);
      return;
    }else{
      
 // 在这里添加其他成功后的逻辑
    // 获取弹窗元素
    let modal = document.querySelector('.modal-container');
     modal.style.display="block"
    // 获取关闭按钮元素
    let closeButton = document.querySelector('.close-button');
    // 显示弹窗

    
    // 点击关闭按钮隐藏弹窗
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // 点击弹窗外部区域也可以隐藏弹窗
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
    }

  })
  .catch(error => {
    // 在这里添加错误处理的逻辑
  });
});


const beforeappoint = document.querySelector('.button')
const appoint = document.querySelector('.appoint')
const target =document.getElementById('appoint')
beforeappoint.addEventListener('click', () => {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
 appoint.addEventListener('click', () => {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
const attend=document.querySelector('.attend')
attend.addEventListener('click', () => {
  window.open('https://www.facebook.com/princesscantdefend/posts/pfbid0kVantVTYHhNi9dTeq3GfxuAvx2CQWMHW6fmvRdTBQCVwvSAGp4Uc3XPEQr43oNWCl', '_blank');
}
)

var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
	  centeredSlides: true,
	  loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    
    var swiper1 = new Swiper(".mySwiper1", {
      effect: "cards",
      grabCursor: true,
    });
  
    var swiper = new Swiper(".mySwiper2", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

 
// 获取所有菜单项的链接
const menuLinks = document.querySelectorAll('.menu .guideBox a');
const closeButton = document.querySelector('.menuclose');
const menu = document.querySelector('.menu');

// 为每个菜单项添加点击事件监听器
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // 阻止默认链接跳转行为
    closeMenu(); // 关闭菜单弹窗
    scrollToSection(e.target.getAttribute('href')); // 滚动到相应位置
  });
});
const menuButton=  document.querySelector('.menuButton');
  menuButton.addEventListener('click', () => {
    menu.style.display='block';
  });
// 关闭菜单弹窗的函数
function closeMenu() {
  menu.style.display = 'none'; // 隐藏菜单弹窗
}

// 滚动到相应位置的函数
function scrollToSection(sectionId) {
  let targetElement;
  switch (sectionId) {
    case 'menuAppoint':
      targetElement = document.querySelector('#appoint');
      break;
    case 'menuIntro':
      targetElement = document.querySelector('#intro');
      break;
    case 'menuattention':
      targetElement = document.querySelector('#attention');
      break;
    case 'menuPrize':
        targetElement = document.querySelector('#menuPrize');
        break;  
  }
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到目标位置
  }
}

// 为关闭按钮添加点击事件监听器
closeButton.addEventListener('click', closeMenu);



// 获取所有菜单项的链接
const languagePoplinks = document.querySelectorAll('.languagePop .guideBox a');
const backButton = document.querySelector('.menuback');
const languagePop = document.querySelector('.languagePop');
// 为每个菜单项添加点击事件监听器
languagePoplinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // 阻止默认链接跳转行为
    backMenu(); // 关闭菜单弹窗
    closeMenu();
    switchLanguage(link.dataset.lang);
  });
});
const languageButton=  document.querySelector('.languageButton');
languageButton.addEventListener('click', () => {
    languagePop.style.display='block';
    menu.style.display='none';
  });
// 关闭菜单弹窗的函数
function backMenu() {
    languagePop.style.display = 'none'; // 隐藏菜单弹窗
    menu.style.display='block';
}

// 滚动到相应位置的函数


// 为关闭按钮添加点击事件监听器
backButton.addEventListener('click', backMenu);
