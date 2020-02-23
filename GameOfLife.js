
//Authors : Zheng Long Yang & Stephanie G-Vachon
//11/11/2016

// État de la grille
// Note : ne modifiez pas ces noms de variables
var width = 40, height = 40;
var cells = Array(height); // Besoin d'un copyArray 2D de 40x40 ici pour gérer la grille


//Initialize cells 
function initializeCells(height,width)
{	
	for(var j = 0; j < height; j++){
        cells[j] = Array(width);
		for(var k = 0; k < width; k++){
            cells[j][k] = 0;
        }
    }
	return cells;
}

//Creates a 2d array
function array2D(height,width)
{
	//instantiate a version of array with a defined height
	var array = Array(height)
	//creates a second dimension of size width for each cases of height
	for(var i = 0; i< height;i++)
	{
		array[i] = Array(width);
	}
	return array;
}

//function that mirrors an existing array
function copieArray(originalArray,copiedArray)
{
	copyArray = array2D(height,width); // creating array of same height and width
	
	//initializes all elemments to that of the original array
    for(var i = 0; i < width; i++)
	{
        for(var j = 0; j < height; j++)
		{
            copyArray[i][j] = originalArray[i][j];
        }
    }
	return copyArray;
}
var scanner = function (x,y,up,down,left,right)
{
    var counter = 0;
    
    //scan's up left,
    if(cells[left][up] == 1) 
		counter+=1;
	//scan's up down.
	if(cells[left][down] == 1)
		counter+=1;
	
	//check cell above 
    if(cells[x][up] == 1) 
		counter+=1;
	//check cell below
	if(cells[x][down] == 1)
		counter+=1;
	
	//check cell up right
	if(cells[right][up] == 1) 
		counter+=1;
	//check cell down right
    if(cells[right][down] == 1)
		counter+=1;
	
   //check cell right
	if(cells[right][y] == 1) 
		counter+=1;
	//check cell left
    if(cells[left][y] == 1) 
		counter+=1;
	
	//returns a counter
    return counter;
};
//Apply all the rules of GoL
function applyRules(cellsArray,aliveNearbyCells,i,j)
{			//var of the state of a cell
			var alive;
			
			switch(cellsArray[i][j])
			{
				//if the element is 0 there for he is dead
				case 0:
					alive = false;
					break;
				//otherwise it is alive
				case 1:
					alive = true;
					break;
			}

			//Kill cell
            if(aliveNearbyCells<2)
			{
                Grid.colorCell(i,j,'black');
                cellsArray[i][j]=0;
            }
            //Keep on living
            else if((aliveNearbyCells==2||aliveNearbyCells==3) && alive==true)
			{
                cellsArray[i][j]=1;
            }
            //Kill cell : Overpopulation
            else if(aliveNearbyCells>3)
			{
                Grid.colorCell(i,j,'black');
                cellsArray[i][j]=0;
            }	
            //Becomes alive if there are 3 nearby and ur dead.
            else if(aliveNearbyCells==3 && alive==false)
			{
                Grid.colorCell(i,j,'#00ff00');
                cellsArray[i][j]=1;
            }
}

var changeState = function(x, y) {	

	// change state for a coordinate in cells
	//if cell is 1, turn it black and reset it to 0
	if(cells[x][y] == 1)
	{
		Grid.colorCell(x,y, 'black');
		cells[x][y] = 0;
	}
	//else turn it green and set it to 1.
	else
	{
		Grid.colorCell(x,y, '#00ff00');
		cells[x][y] = 1;
	}
	
};


var step = function()
{
	//create an instance of cells to operate on it without tempering on original.
	var copyArray = copieArray(cells,copyArray);

   // loop to go through all elements in array and adjust each elements.
    for (var i = 0; i < width; i++){   		
		for (var j = 0; j < height; j++){	
			
			//Assigning specifically up down left and right
			var up = j-1;
            var down = j+1;
            var left = i-1;
            var right = i+1;
           
            //warping
            if(i-1 == -1)		
				left = width-1;
            if(i+1 == width)    
				right = 0;
            if(j-1 == -1)		
				up = height-1;
            if(j+1 == height)  
				down = 0;
           
			applyRules(copyArray,scanner(i,j,up,down,left,right),i,j);
        }
        
    }
	//update the current cells
    cells = copieArray(copyArray,cells);
	return cells;	
	
};


//Creates random cells to a percentage level assigned in to the grid
var randomGrid = function(percent) 
{
	for (var j = 0; j < height; j++) { 
	
		for (var k = 0; k < width; k++) { 

				var rng = Math.random(); //creates a rng
				var numb = (rng * 100); //convert it to a random percentage number from 0 to 100
				//say that number is above a certain percent it'll flip the case down.
				if (numb > percent){
					cells[j][k]=1;
					changeState(j,k);
				}
				else
				{
					cells[j][k]=0;
					changeState(j,k);
				}
		}
				
	}
};


var resetGrid = function() 
{
	for(var j = 0; j < height; j++){
		for(var k = 0; k < width; k++){
			cells[j][k]= 1;//on alive toute les cellules pour pouvoir tous les remettre a 0 
            changeState(j,k);
        }
	}
};


var resizeGrid = function(newWidth, newHeight) 
{
	width = newWidth;
	height = newHeight;
	//creates a new grid with the new sizes
	Grid.create(height,width);
	//remake the cells with the new height and width.
	cells = array2D(height,width);

	
};

// Crée la grille initiale
Grid.create(40,40);
initializeCells(height,width);