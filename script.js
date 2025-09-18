let noClickCount = 0;
let yesClickCount = 0;

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const result = document.getElementById("result");

// Xử lý khi click nút "Em đồng ý"
yesBtn.addEventListener("click", function () {
  yesClickCount++;

  // Tạo hiệu ứng trái tim bay
  createFloatingHearts();

  // Hiển thị thông báo
  result.innerHTML = `
        🎉 Yayyy! Em đồng ý rồi! 🎉<br>
        💕 Trung Thu này sẽ thật đặc biệt với anh và em! 💕<br>
        🌙 Anh sẽ chuẩn bị những điều bất ngờ cho em nhé! ✨
    `;
  result.classList.add("show");

  // Ẩn các nút
  setTimeout(() => {
    document.querySelector(".button-container").style.display = "none";
  }, 1000);
});

// Xử lý khi hover/click nút "Không thèm"
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", function (e) {
  e.preventDefault();
  noClickCount++;
  moveNoButton();

  // Làm nút "Không thèm" nhỏ dần sau mỗi lần click
  const newScale = Math.max(0.3, 1 - noClickCount * 0.12); // Nhỏ dần nhưng không nhỏ hơn 0.3
  const currentTransform = noBtn.style.transform || "";
  noBtn.style.transform = `${currentTransform} scale(${newScale})`;

  // Làm nút "Em đồng ý" to dần
  const yesScale = Math.min(2.0, 1 + noClickCount * 0.15); // To dần nhưng không to hơn 2.0
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.transition = "transform 0.3s ease";

  // Thông báo khuyến khích
  const encouragements = [
    "🥺 Anh buồn quá... em suy nghĩ lại đi!",
    "💔 Anh sẽ rất cô đơn nếu em không đi...",
    "🌙 Trung Thu mà không có em thì không trọn vẹn!",
    "😢 Em nhấn nút bên cạnh đi, anh hứa sẽ vui lắm!",
    "❤️ Anh biết em chỉ đùa thôi, em yêu anh mà!",
    "😭 Nút này càng nhỏ em càng làm anh buồn!",
    "💖 Nút kia to lên rồi, em nhấn đi mà!",
    "🙏 Anh van xin em đi... nút đỏ to thế rồi!",
  ];

  if (noClickCount <= encouragements.length) {
    result.innerHTML = encouragements[noClickCount - 1];
    result.classList.add("show");
  }
});

function moveNoButton() {
  // Lấy kích thước toàn bộ viewport
  const maxX = window.innerWidth - 200; // Trừ đi width của nút
  const maxY = window.innerHeight - 100; // Trừ đi height của nút

  // Tạo vị trí ngẫu nhiên trong toàn bộ trang
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Đảm bảo nút không ra ngoài màn hình
  const safeX = Math.max(10, Math.min(randomX, maxX));
  const safeY = Math.max(10, Math.min(randomY, maxY));

  // Đặt vị trí mới cho nút (position fixed so với viewport)
  noBtn.style.position = "fixed";
  noBtn.style.left = safeX + "px";
  noBtn.style.top = safeY + "px";
  noBtn.style.zIndex = "1000";

  // Hiệu ứng nhảy với transition
  noBtn.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

  // Reset về relative sau một thời gian để không bị stuck
  setTimeout(() => {
    // Giữ hiệu ứng wiggle
    noBtn.style.animation = "button-wiggle 1s infinite alternate";
  }, 400);
}

function createFloatingHearts() {
  const heartsContainer = document.createElement("div");
  heartsContainer.classList.add("floating-hearts");
  document.body.appendChild(heartsContainer);

  // Tạo nhiều trái tim
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = ["❤️", "💖", "💕", "💗", "💘", "😍", "🥰"][
      Math.floor(Math.random() * 7)
    ];

    // Vị trí ngẫu nhiên
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);
  }

  // Xóa container sau khi animation hoàn thành
  setTimeout(() => {
    if (document.body.contains(heartsContainer)) {
      document.body.removeChild(heartsContainer);
    }
  }, 3000);
}
