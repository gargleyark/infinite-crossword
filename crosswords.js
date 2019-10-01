(() => {
    let sideLength = 10
    let grid = []
    let words = [
        'yellow',
        'hat',
        'castle',
        'south carolina',
        'pets',
        'doorway',
        'icing',
        'legendary',
        'rat',
        'car',
        'house',
        'shed',
        'capricorn',
        'everybody',
        'crossword'
    ]
    let activeWord

    const wordMap = {}

    const wordFits = position => {
        let start
        if (activeWord.direction === 'across') {
            start = activeWord.top - position
        } else if (activeWord.direction === 'down') {
            start = activeWord.left - position
        }
        return start > -1
    }

    words.forEach(word => {
        const wordArray = word.split('')
        let direction = Math.random() < 0.5 ? 'down' : 'across'
        let left, top;

        if (!activeWord) {
            left = 0, top = 0;
        } else {
            let position = 0
            let found = false
            for (let index in activeWord.wordArray) {
                const activeLetter = activeWord.wordArray[index]
                let currentPosition = 0
                for (let currentIndex in wordArray) {
                    const currentLetter = wordArray[currentIndex]
                    if (currentLetter === activeLetter && wordFits(currentPosition)) {
                        if (activeWord.direction === 'down') {
                            direction = 'across'
                            left = activeWord.left - currentPosition
                            top = activeWord.top + position
                        } else  {
                            direction = 'down'
                            left = activeWord.left + position
                            top = activeWord.top - currentPosition
                        }
                        found = true
                    }
                    currentPosition++
                }
                position++
            }
            if (!found) {
                return
            }
        }

        activeWord = {
            left,
            top,
            direction,
            wordArray
        }
    
        for (let index in wordArray) {
            const letter = wordArray[index]

            wordMap[`${left},${top}`] = letter
            if (direction === 'down') {
                top+=1
            } else {
                left+=1
            }
        }
    })

    const updateGrid = () => {
        for (let left = 0; left < sideLength; left+=1) {
            grid[left] = grid[left] || []
            for (let top = 0; top < sideLength; top+=1) {
                grid[left][top] = grid[left][top] || wordMap[`${left},${top}`]
            }
        }
    }

    updateGrid()

    console.log(grid)
})();