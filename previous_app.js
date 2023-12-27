document.addEventListener('DOMContentLoaded', ()=>{

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8;
    const squares = [];
    let score = 0;

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
            square.setAttribute('draggable' , true); //Making each div draggable
            square.setAttribute('id', i); //assigning each div an id from 0 to 63 

            let randomColor = Math.floor(Math.random() * candyColors.length); //randomColor stores an integer value between 0 to 5.
            square.style.backgroundImage = candyColors[randomColor];
            
            grid.appendChild(square); //creates a new div
            squares.push(square); // stores the "object HTMLDivElement" in the array
           // console.log(i + "\nsquares[" + i + "]: "+ squares[i]);
        }

    }

    createBoard()

    //Drag the Candies

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));  //square is a paramter being used in the arrow function
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));

    squares.forEach(function(square){square.addEventListener('drop', dragDrop)});

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log("Colour Being Dragged: " + colorBeingDragged + "\n Square Id being Dragged: " + squareIdBeingDragged);
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
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundImage;
        console.log("Color Being Replaced: " + colorBeingReplaced);

        squareIdBeingReplaced = parseInt(this.id);
        console.log("\Square Id Being Replaced: " + squareIdBeingReplaced);
        
        this.style.backgroundImage = colorBeingDragged
        console.log("\this.style.backgroundImage: " + this.style.backgroundImage );

        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
        console.log("\squares[squareIdBeingDragged].style.backgroundImage " + squares[squareIdBeingDragged].style.backgroundImage );
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

    const isHorizontalMatch = checkForMatches(squareIdBeingReplaced, 'left') || checkForMatches(squareIdBeingReplaced, 'right');
    const isVerticalMatch = checkForMatches(squareIdBeingReplaced, 'up') || checkForMatches(squareIdBeingReplaced, 'down');


        let validMove =validMoves.includes(squareIdBeingReplaced)
        console.log("squareIdBeingReplaced: " + squareIdBeingReplaced)
        console.log("validMoves.includes(squareIdBeingReplaced): " + validMoves.includes(squareIdBeingReplaced));
        console.log("\nvalidMove: " + validMove);


        if(squareIdBeingReplaced && validMove && (isHorizontalMatch || isVerticalMatch)){
            console.log("\nsquareIdBeingReplaced: " + squareIdBeingReplaced + " && validMove: " + validMove);
            squareIdBeingReplaced = null;
        }else if(squareIdBeingReplaced && !validMove && !(isHorizontalMatch || isVerticalMatch)){
            console.log("\nsquareIdBeingReplaced: " + squareIdBeingReplaced + " && !validMove: " + validMove);

            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            console.log("\squares[squareIdBeingReplaced].style.backgroundImage " + squares[squareIdBeingReplaced].style.backgroundImage );

            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
            console.log("\squares[squareIdBeingDragged].style.backgroundImage " + squares[squareIdBeingDragged].style.backgroundImage );

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

              /*  if(isFirstRow && squares[i].style.backgroundImage === ''){

                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor];

                } */

            }

        }
    }


    function checkForMatches(index, direction) {
        const color = squares[index].style.backgroundImage;
    
        // Define the indexes to check based on the direction
        const indexesToCheck = {
            left: [index - 1, index - 2],
            right: [index + 1, index + 2],
            middlRow: [index + 1, index -1],

            up: [index - width, index - (width * 2)],
            down: [index + width, index + (width * 2)],
            middleColumn: [index + width, index - width]
        };
    
        const matchingIndexes = indexesToCheck[direction].filter(i => {
            const isValidIndex = squares[i] && squares[i].style.backgroundImage === color;
            return isValidIndex;
        });
    
        return matchingIndexes.length >= 2;
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