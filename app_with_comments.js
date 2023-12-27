document.addEventListener('DOMContentLoaded', ()=>{

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8;
    const squares = [];
    let score = 0;
    var matchColor = 0;
    var squareId = 0;
    var matchColorLeft = 0;
    var matchColorRight = 0;
    var matchColorLeft1 = 0;
    var matchColorRight1 = 0;

    var matchColorUp = 0;
    var matchColorDown = 0;
    var matchColorUp1 = 0;
    var matchColorDown1 = 0;


    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ];
    // Create Board

    function createBoard() {

        for(i = 0; i < width*width; i++){

            const square = document.createElement('div');
            square.setAttribute('draggable' , true);
            square.setAttribute('id', i);

            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundImage = candyColors[randomColor];
            
            grid.appendChild(square);
            squares.push(square);

        }

    }

    createBoard()

    //Drag the Candies

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart(){

        matchColor = this.style.backgroundImage;

        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log(this.id, 'dragstart')
    }



    function dragOver(e){
        e.preventDefault();
        console.log(this.id, 'dragover')
    }

    function dragEnter(e){
        e.preventDefault();
        console.log(this.id, 'dragenter')
    }

    function dragLeave(){
        console.log(this.id, 'dragleave')
    }

    function dragDrop(){

        squareId = parseInt(this.id);
        //let squareIdMinus1 = squareId - 1;
     /*  matchColorLeft = squares[squareId - 1].style.backgroundImage || 'Default Value'
        matchColorRight = squares[squareId + 1].style.backgroundImage || 'Default Value'
        matchColorLeft1 = squares[squareId - 2].style.backgroundImage || 'Default Value'
        matchColorRight1 = squares[squareId + 2].style.backgroundImage || 'Default Value'

        matchColorUp = squares[squareId - width].style.backgroundImage || 'Default Value'
        matchColorDown = squares[squareId + width].style.backgroundImage || 'Default Value'
        matchColorUp1 = squares[squareId - (width*2)].style.backgroundImage|| 'Default Value'
        matchColorDown1 = squares[squareId + (width*2)].style.backgroundImage|| 'Default Value'
        */

        
    // Initialize all variables with the default value
    matchColorLeft = 'Default Value';
    matchColorRight = 'Default Value';
    matchColorLeft1 = 'Default Value';
    matchColorRight1 = 'Default Value';
    matchColorUp = 'Default Value';
    matchColorDown = 'Default Value';
    matchColorUp1 = 'Default Value';
    matchColorDown1 = 'Default Value';

    // Check for valid combinations and update the variables
    if (squares[squareId - 1]) {
        matchColorLeft = squares[squareId - 1].style.backgroundImage;
    }
    if (squares[squareId + 1]) {
        matchColorRight = squares[squareId + 1].style.backgroundImage;
    }
    if (squares[squareId - 2]) {
        matchColorLeft1 = squares[squareId - 2].style.backgroundImage ;
    }
    if (squares[squareId + 2]) {
        matchColorRight1 = squares[squareId + 2].style.backgroundImage ;
    }
    if (squares[squareId - width]) {
        matchColorUp = squares[squareId - width].style.backgroundImage;
    }
    if (squares[squareId + width]) {
        matchColorDown = squares[squareId + width].style.backgroundImage ;
    }
    if (squares[squareId - (width * 2)]) {
        matchColorUp1 = squares[squareId - (width * 2)].style.backgroundImage;
    }
    if (squares[squareId + (width * 2)]) {
        matchColorDown1 = squares[squareId + (width * 2)].style.backgroundImage;
    }

  /*      try {
    
            let firstValue, secondValue;
    
            // Group A
             matchColorLeft = squares[squareId - 1].style.backgroundImage;
             matchColorRight = squares[squareId + 1].style.backgroundImage;
             matchColorLeft1 = squares[squareId - 2].style.backgroundImage;
             matchColorRight1 = squares[squareId + 2].style.backgroundImage;
    
            const groupAValues = [matchColorLeft, matchColorRight, matchColorLeft1, matchColorRight1].filter(value => value !== '');
    
            if (groupAValues.length >= 2) {
                [firstValue, secondValue] = groupAValues;
            } else {
                // Group B
                 matchColorUp = squares[squareId - width].style.backgroundImage;
                 matchColorDown = squares[squareId + width].style.backgroundImage;
                 matchColorUp1 = squares[squareId - (width * 2)].style.backgroundImage;
                 matchColorDown1 = squares[squareId + (width * 2)].style.backgroundImage;
    
                const groupBValues = [matchColorUp, matchColorDown, matchColorUp1, matchColorDown1].filter(value => value !== '');
    
                if (groupBValues.length >= 2) {
                    [firstValue, secondValue] = groupBValues;
                } else {
                    // Handle the case where there are not enough values in either group
                    throw new Error('Not enough values in Group A or Group B');
                }
            }
    
            console.log(this.id, 'dragdrop');
            colorBeingReplaced = this.style.backgroundImage;
            squareIdBeingReplaced = parseInt(this.id);
            this.style.backgroundImage = colorBeingDragged;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    
            // Use firstValue and secondValue as needed
            console.log(firstValue, secondValue);
        } catch (error) {
            console.error('Error in dragDrop:', error);
        } */

        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd(){
        console.log(this.id, 'dragend')

        //What is a Valid move?
        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged -width,
            squareIdBeingDragged +1,
            squareIdBeingDragged +width
        ];


        let validMove =validMoves.includes(squareIdBeingReplaced)



        if(squareIdBeingReplaced && validMove) 
           {
            
            if(matchColor === matchColorLeft && matchColor === matchColorRight)
            squareIdBeingReplaced = null;
            else if(matchColor === matchColorUp && matchColor === matchColorDown)
            squareIdBeingReplaced = null;
            else if(matchColor === matchColorLeft && matchColor === matchColorLeft1)
            squareIdBeingReplaced = null;
            else if(matchColor === matchColorRight && matchColor === matchColorRight1)
            squareIdBeingReplaced = null;
            else if(matchColor === matchColorUp && matchColor === matchColorUp1)
            squareIdBeingReplaced = null;
            else if(matchColor === matchColorDown && matchColor === matchColorDown1)
            squareIdBeingReplaced = null;
            else {squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
                squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;};
//squareIdBeingReplaced = null;
        }else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;


    }

    //drop candies once some have been cleared

    function moveDown() {

        for(i=0; i<55; i++) {
          
            if(i>=0 && i<=7 && squares[i].style.backgroundImage === '')
            {
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor];
            }

            if(squares[i+width].style.backgroundImage === ''){

                squares[i+width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = ''

                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i);

             /*   if(isFirstRow && squares[i].style.backgroundImage === ''){

                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor];

                }*/

            }

        }
    }

    //Checking the matches
    function checkRowForFive(){

        for( i=0; i<=59; i++){

            let rowOfFive= [i, i+1, i+2, i+3, i+4]
            let decidedColor= squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 24, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55];
            if(notValid.includes(i)) continue; //skips the indexes in not valid


            if(rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){

                score += 5;
                scoreDisplay.innerHTML = score;

                rowOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

            }
        }

    }

    function checkColumnForFive(){

        for( i=0; i<=31; i++){

            let columnOfFive= [i, i+width, i+width*2, i+width*3, i+width*4]
            let decidedColor= squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){

                score += 4;
                scoreDisplay.innerHTML = score;

               
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

            }
        }

    }


    function checkRowForFour(){

        for( i=0; i<=60; i++){

            let rowOfFour= [i, i+1, i+2, i+3]
            let decidedColor= squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
            if(notValid.includes(i)) continue; //skips the indexes in not valid


            if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){

                score += 4;
                scoreDisplay.innerHTML = score;


                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

            }
        }

    }

    function checkColumnForFour(){

        for( i=0; i<=39; i++){

            let columnOfFour= [i, i+width, i+width*2, i+width*3]
            let decidedColor= squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){

                score += 4;
                scoreDisplay.innerHTML = score;

               
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

            }
        }

    }
    //Checking For Row Of Three

    function checkRowForThree(){

        for( i=0; i<=61; i++){

            let rowOfThree= [i, i+1, i+2]
            let decidedColor= squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            if(notValid.includes(i)) continue; //skips the indexes in not valid


            if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){

                score += 3;
                scoreDisplay.innerHTML = score;


                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

            }
        }

    }

    
    function checkColumnForThree(){

        for( i=0; i<=47; i++){

            let columnOfThree= [i, i+width, i+width*2]
            let decidedColor= squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){

                score += 3;
                scoreDisplay.innerHTML = score;

               
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

            }
        }

    }


    checkRowForFive();
    checkColumnForFive();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();

    window.setInterval(function(){
        
        moveDown();

        checkRowForFive();
        checkColumnForFive();

        checkRowForFour();
        checkColumnForFour();

        checkRowForThree();
        checkColumnForThree();
    }, 100) //invokes checkRowForThree function every 100 milli seconds


})