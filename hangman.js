window.onload = start;

var passwords = new Array(10);
passwords[0] = 'no pain no gain';
passwords[1] = 'all that glitter is not gold';
passwords[2] = 'better late than never';
passwords[3] = 'under the weather';
passwords[4] = 'break a leg';
passwords[5] = 'sat on the fence';
passwords[6] = 'once in a blue moon';
passwords[7] = 'go down in flames';
passwords[8] = 'come rain or shine';
passwords[9] = 'as right as rain';

var password = passwords[Math.floor(Math.random()*9)];
password = password.toUpperCase();


var password_length = password.length;

var misses = 0;

var yes = new Audio('wav/yes.wav')
var no = new Audio('wav/no.wav')
var win = new Audio('wav/win.wav')
var lose = new Audio('wav/lose.wav')

var password1 = '';
for (i=0; i<password_length; i++)
{
    if (password.charAt(i)==' ') password1 = password1 + ' ';
    else password1 = password1 + '_';
}

function write_password()
{
    document.getElementById('pass').innerHTML = password1;
}

var letters = new Array(35);
letters[0] = 'A';
letters[1] = 'Ą';
letters[2] = 'B';
letters[3] = 'C';
letters[4] = 'Ć';
letters[5] = 'D';
letters[6] = 'E';
letters[7] = 'Ę';
letters[8] = 'F';
letters[9] = 'G';
letters[10] = 'H';
letters[11] = 'I';
letters[12] = 'J';
letters[13] = 'K';
letters[14] = 'L';
letters[15] = 'Ł';
letters[16] = 'M';
letters[17] = 'N';
letters[18] = 'Ń';
letters[19] = 'O';
letters[20] = 'Ó';
letters[21] = 'P';
letters[22] = 'Q';
letters[23] = 'R';
letters[24] = 'S';
letters[25] = 'Ś';
letters[26] = 'T';
letters[27] = 'U';
letters[28] = 'V';
letters[29] = 'W';
letters[30] = 'X';
letters[31] = 'Y';
letters[32] = 'Z';
letters[33] = 'Ż';
letters[34] = 'Ź';


function start()
{
    var div_content = '';

    for (i=0; i<=34; i++)
    {
        var element = 'lit' + i;
        div_content = div_content + '<div class="letter" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
    }

    document.querySelector('#alphabet').innerHTML = div_content;

    write_password();
}

String.prototype.setLetter = function(miejsce, znak)
{
    if (miejsce > this.length - 1) return this.toString();
    else return this.substring(0, miejsce) + znak + this.substring(miejsce+1);
}

function check(nr)
{

    var hit = false;

    for(i=0; i<password_length; i++)
    {
        if (password.charAt(i) == letters[nr])
        {
            password1 = password1.setLetter(i,letters[nr]);
            hit = true;
        }
    }

    if(hit == true)
    {
        yes.play();
        var element = 'lit' + nr;
        document.getElementById(element).style.background = 'darkgreen';
        document.getElementById(element).style.cursor = 'default';
        document.getElementById(element).style.color = '#00C000';
        document.getElementById(element).style.border = '3px solid #00C000';
        document.getElementById(element).style.textShadow = 'none';

        write_password();
    }
    else
    {
        no.play();
        var element = 'lit' + nr;
        document.getElementById(element).style.background = '#330000';
        document.getElementById(element).style.cursor = 'default';
        document.getElementById(element).style.color = '#C00000';
        document.getElementById(element).style.border = '3px solid #C00000';
        document.getElementById(element).style.textShadow = 'none';
        document.getElementById(element).setAttribute('onclick', ';');

        misses++;
        var image = 'img/s'+misses + '.jpg';
        document.getElementById('gallows').innerHTML = '<img src="'+image+'" alt="gallows"/>'
    }

    if (password == password1)
    {
        win.play();
        document.getElementById('alphabet').innerHTML = '<br><span id="end"><span class="green">You won!</span><br> the password is: <br>"'+password+'"<br><span class="reset" onclick="location.reload()">again?</span></span>'
    }

    if (misses >= 9)
    {
        lose.play()
        document.getElementById('alphabet').innerHTML = '<br><span id="end"><span class="red">You Lost!</span><br><br><span class="reset" onclick="location.reload()">again?</span></span>'
    }
}