// Функция для оборачивания букв в теги span
   function wrapLettersWithWords(element) {
    const letterDelay = parseFloat(element.dataset.letterDelay) || 0.08;
    const wordDelay = parseFloat(element.dataset.wordDelay) || 0.4;
    
    const words = element.textContent.split(/(\s+)/);
    let totalDelay = 0;
    
    element.innerHTML = words.map(word => {
      if(word.match(/\s+/)) {
        return `<span class="space">${word}</span>`;
      }
      
      const letters = word.split('');
      const wordContent = letters.map((letter, index) => {
        const delay = totalDelay + (index * letterDelay);
        return `<span class="letter" style="animation-delay: ${delay}s">${letter}</span>`;
      }).join('');
      
      totalDelay += (letters.length * letterDelay) + wordDelay;
      return `<span class="word">${wordContent}</span>`;
    }).join('');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;
      const repeat = target.dataset.repeat === 'true';
      
      if(entry.isIntersecting) {
        target.classList.add('active');
        if(!repeat) observer.unobserve(target);
      } else {
        if(repeat) target.classList.remove('active');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.head-animate').forEach(heading => {
    wrapLettersWithWords(heading);
    observer.observe(heading);
  }); 