document.getElementById('question-form').onsubmit = function(event) {
    // Prevent actually submitting the form, which will leave the page
    event.preventDefault();

    // Set a 5 second timeout
    document.getElementById('submit').disabled = true;
    setTimeout(function() {
        document.getElementById('submit').disabled = false;
    }, 5000);
    // Get the user's question
    var question = document.getElementById('question').value;

    // List of possible answers
    var answers = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Yes.',
        'Signs point to yes.',
        'Outlook good.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ];

    // List of possible voices
    var voices = [
        'sound1',
        'sound2',
        'sound3',
        'sound4',
        'sound5',
        'sound6',
        'sound7',
        'sound8',
        'sound9',
        'sound10',
        'sound11',
        'sound12',
        'sound13',
        'sound14',
        'sound15',
        'sound16',
        'sound17',
        'sound18',
        'sound19',
        'sound20'
    ]

    // Generate a random number between 0 and the length of the answers array
    var randomNumber = Math.floor(Math.random() * answers.length);

    // Play the sound
    document.getElementById('eightball-sound').play();

    // Animate the 8Ball
    document.getElementById('eightball-wrapper').className = 'spinning';

    // Reset the answer animation
    document.getElementById('answer').style.animation = 'none';

    // Change the particles to red
    document.body.classList.add('thinking');

    // Display the answer
    setTimeout(function() {
        document.getElementById('eightball-wrapper').className = '';
        document.getElementById('answer').textContent = answers[randomNumber];
        document.getElementById('answer').style.animation = null;
        document.body.classList.remove('thinking');
        document.getElementById(voices[randomNumber]).play();
    }, 3000);

};

document.getElementById('eightball').addEventListener('click', () => {
    document.getElementById('submit').click();
});

const runTests = false;

if (runTests) {
    // Test that the Magic 8 Ball page loads successfully
    (function() {
        var magic8BallPage = document.getElementsByTagName('html')[0];
        if (magic8BallPage) {
            console.log('Magic 8 Ball page loaded successfully');
        } else {
            console.error('Error: Magic 8 Ball page did not load');
        }
    })();

    // Test that the question input and submit button exist
    (function() {
        var questionInput = document.getElementById('question');
        var submitButton = document.getElementById('submit');
        if (questionInput && submitButton) {
            console.log('Question input and submit button exist on the page');
        } else {
            console.error('Error: Question input or submit button does not exist');
        }
    })();

    // Test that the Magic 8 Ball gives a response to a question
    (function() {
        var questionInput = document.getElementById('question');
        var submitButton = document.getElementById('submit');
        var answerDiv = document.getElementById('answer');

        // Set a question and click the submit button
        questionInput.value = 'Will it rain today?';
        submitButton.click();

        // Wait for the response to be displayed
        setTimeout(function() {
            if (answerDiv.textContent.trim()) {
                console.log('Magic 8 Ball gave a response');
            } else {
                console.error('Error: Magic 8 Ball did not give a response');
            }
        }, 4000);
    })();
}

const TIME_PER_PARTICLE = 100;
let particles = [];
let lastParticleTime = 0;
const PARTICLE_LIFETIME = 5000;

function frame () {
    const now = Date.now();

    if (now - lastParticleTime > TIME_PER_PARTICLE) {
        lastParticleTime = now;
        const element = Object.assign(document.createElement('div'), {
            className: 'particle'
        });
        element.style.opacity = Math.random() * 0.5 + 0.2;
        element.style.transform = `scale(${Math.random() * 0.2 + 0.9})`;
        document.getElementById('particles').append(element);
        particles.push({
            element,
            x: Math.random(),
            dx: Math.random() * 0.4 - 0.2,
            birth: now
        });
    }

    for (const particle of particles) {
        const t = (now - particle.birth) / PARTICLE_LIFETIME;
        if (t > 1) {
            particle.dead = true;
            particle.element.remove();
            continue;
        }
        particle.element.style.left = `${(particle.x + particle.dx * t) * 100}%`;
        particle.element.style.bottom = `${t * 100}%`;
    }
    particles = particles.filter(particle => !particle.dead);

    window.requestAnimationFrame(frame);
}
frame();
