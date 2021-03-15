//region delegate
function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}

//endregion

// region const
const columns = 7;
const rows = 6;
// endregion

/*
+ item id:
*     |   0    |   1   |    2   |
*    | row |  column  |  color |
 */

const y = {
    name: 'Player 1',
    color : 'yellow'
};

const r = {
    name: 'Player 2',
    color: 'red'
};

let activePlayer = r;


const switchPlayers = () => {
    activePlayer === y ? activePlayer = r : activePlayer = y
}

const table = document.querySelector('#table');
let game = {};
//region generate game table

const generateTable = () => {
    for (let r = 1; r <= rows; r++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let c = 1; c <= columns; c++) {
            const item = document.createElement('div');
            item.classList.add('item');
            r === rows ? item.id = `${r}${c}wa` : item.id = `${r}${c}w`;
            row.appendChild(item);
            game[`${r}${c}`] = `w`;
        }
        table.appendChild(row);
    }
}
generateTable();


const colorize = () => {
    const event = this.event;
    const targetIsActive = event.target.id.includes('a');
    const targetRow = event.target.id[0];
    const targetColumn = event.target.id[1];
    console.log('targetRow' + targetRow);
    console.log('targetColumn' + targetColumn);
    if (targetRow > 1) {
        let upperElement = document.getElementById(`${targetRow - 1}${targetColumn}w`);
        if (upperElement) {
            targetIsActive ? upperElement.id = `${targetRow - 1}${targetColumn}wa` : console.log('target not active');
        }
    }
    if(targetIsActive){
        event.target.style.backgroundColor = activePlayer.color;
        event.target.id = `${targetRow}${targetColumn}${activePlayer.color[0]}`;
        game[`${targetRow}${targetColumn}`] = 'r';
    }
    switchPlayers();
    console.log(game);
}

delegate(table, 'click', '.item', colorize)


console.log(game);


//endregion

