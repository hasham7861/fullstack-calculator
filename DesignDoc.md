# Design Doc

[Click me to see what this app looks like](https://youtu.be/58JoLP19FJQ)

## Summary of what was build

- Everything mentioned in the Part 2 was built.
- The basic arithmetic operations to not so easy operators to work with in typescript. (+,-,/,*,√,^,%)
- The Memory functions (M+, M-, MR, MC)
- The History Function. Being able to move left and right in history
- A dedicated backend to be able to authenticate, sign-up, and logout
- Can also see the user authentication status on the top navbar

## Extra Stuff added

- Saveable user sessions, strong user sessions to be specific. You can come back after closing the window you will see yourself logged in
- Cross syncing math expressions history. History is saved to the user when logged in.
- Better UI + Mobile Web Responsive. It really makes you wanna use my calculator.
- Added integration tests to the home-made math-expressions-evaluator. The tests helped me from touching up the expressions evaluator.

## Context on design decisions and framework choices

### Following are grouped by big decisions I made

#### Homemade Math Expressions Evaluator?

- The biggest assumption I made from the requirements document was that I would need to build the math expressions calculator myself. I believed it would make more sense to build it in-house rather than using a package, especially since the core functionality of the app is calculation. If it weren't a core feature, I might have opted for an external package. Regardless, the logic behind this calculator utility is inspired by the renowned Reverse Polish Notation (RPN), also known as postfix notation (PN). I had recently developed an algorithm where I evaluate RPN expressions for their values and can convert back and forth with simple arithmetic operators. I initially believed this would be a straightforward task. However, when I attempted to convert the mathematical expression to PN, I found that sometimes the result was accurate, but more often than not, it evaluated incorrectly. The most challenging aspect was managing brackets and prioritizing the evaluation of expressions within these brackets. As I progressed, I encountered another challenge: handling the square root function and ensuring its accurate evaluation. Additionally, there were nuanced edge cases, such as a number preceding a square root without an operator in between. All in all, this was far from an easy task.

#### Tech Choices?

- The tech stack I utilized includes React, Jest, Node, Express, Typescript, and MongoDB.
- I developed the frontend using React and Typescript because they make it easy and quick to create performant components.
- The frontend also houses the Math Expressions Evaluator, as it didn't make sense to place it on the backend for each calculation. Moreover, the frontend is powerful enough to support it.
- I crafted the backend with Node, Express, Typescript, REST, and MongoDB. I opted for MongoDB not only because I didn't need a heavy relational database—just a simple connection mapping the history of expressions to users—but also because MongoDB was the most cost-effective option for hosting the app.

#### Deployment Choices?

- Fly.io for frontend and backend
- mongo atlas for the database hosting
