const canvas = document.createElement("canvas");
                canvas.id = "bg";
                document.body.appendChild(canvas);
                const ctx = canvas.getContext("2d");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const stars = [];
                const numStars = 100;
                for (let i = 0; i < numStars; i++) {
                    stars.push({
                    x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                    radius: Math.random() * 2,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5
                    });
                }
                function animate() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "blue";
                    for (let i = 0; i < stars.length; i++) {
                    const s = stars[i];
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                    ctx.fill();
                    s.x += s.dx;
                    s.y += s.dy;
                    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
                    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
                    }
                            requestAnimationFrame(animate);
                }
                animate();
                window.addEventListener("resize", () => {
                    canvas.width = window.innerWidth;
                            canvas.height = window.innerHeight;
                });

function mudouTamanho() {
                    var menu = document.getElementById('menu')                   
                    if (window.innerWidth >= 768) {
                        menu.style.display = 'block'
                    } else {
                        menu.style.display = 'none'
                }
        }

                function clickMenu() {
                    if (menu.style.display == 'block') {
                        menu.style.display = 'none'
                    } else (menu.style.display = 'block')
                }