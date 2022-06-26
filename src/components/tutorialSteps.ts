import { replaceSquareBracketsWithBoldTag } from '../utils'

export interface TutorialStep {
  description: string
  examples: string
}

export const tutorialSteps: TutorialStep[] = [
  {
    description: `[Hexyzland] is a minimalistic coding playground
    click [the code examples] below to insert and view them
    then click [the right arrow] to learn more`,
    examples:
      'sin(t-hypot(x,y,z)); sin(2*t-r)/(sin(2*t)*size-x);sin(t+a/60-r*sin(t));sin(2*t+a/30)/(sin(2*t)*size-r)',
  },
  {
    description: `write a function that returns a value between [-1.0] and [1.0]
the value is a hex dot size
you can write the code or click the examples
`,
    examples: '1.0; 0.7; 0.5; 0.2; 0.0;',
  },
  {
    description: `
positive values are white, negatives are red
the function can also return false or true
`,
    examples: '-1.0;-0.5;0.5;1.0;false;true',
  },
  {
    description: `the function is evaluated for each dot individually
    `,
    examples: 'random(); (0.5-random())*2',
  },
  {
    description: `[t] is the time in seconds
    use the time to animate values
    multiply the time to change the speed
    `,
    examples: 't; t*0.5; t*3',
  },
  {
    description: `you can use math functions like [sin] or [sqrt]
    use [sin] or [%] to create loops`,
    examples: 'sin(t);t%2',
  },
  {
    description: `[r] is an index of the hexagon ring
    use [%] to create patterns
    `,
    examples: 'r==2; r==4; r==6; r==8; r%2 ? 1 : -1; [1,0,-1][r%3]',
  },
  {
    description: `A constant [size] is the size of the hexagon 
    use it to convert indexes to values between [0.0] and [1.0]`,
    examples: 'r/size; 1-r/size; 1-2*r/size; 2*r/size-1',
  },
  {
    description: 'combine [r] and [t] to create complex animations',
    examples: 't-r; sin(t-r); sin(t-r/size)',
  },
  {
    description: `[a] is a polar angle 
    the value is between [0] and [360]
    use it to create more complex animations
    `,
    examples:
      'a/360;a%60==0;a%60==0 || r==size;a%60==0 || r%2;sin(t+a/30);sin(t+a/30-r)',
  },
  {
    description: `[x], [y] and [z] is the hexagon axes 
    the values are between [-size] and [size]
    use it for animations
    `,
    examples:
      'x/size; y/size; z/size;x%2 == 0 && y%2 == 0;sin(t-x);sin(t-x/size);sin(t-x-y*2);sin(t-hypot(x,y,z)/10)',
  },
  {
    description: `more examples
    you can double click the hexagon to show some visual tweaks 
    `,
    examples:
      'x%2==0 && y%2==0 ?sin(t):-cos(t); sin(t-hypot(2*size+x,y,z)); x%2 ? sin(t-x-y*2) : -sin(t-x-y*2);sin(t-hypot(x,y,z) + r)',
  },
  {
    description: `source code <a class="underline" href="https://github.com/ptol/hexyzland" target="_blank">https://github.com/ptol/hexyzland</a>
    `,
    examples:
      'sin(t)*size-r;1/(sin(2*t)*size-r);sin(t+r%2);1/(sin(2*t+a/60)*9-x);sin(t*2+a/60-hypot(x,y,z))',
  },
  {
    description: `what you type is saved in [the url] 
    share your creations
    [Have fun]`,
    examples: 'r==5 && (200<a && a<340) || (r==4 && x==3)',
  },
].map((x) => ({
  description: replaceSquareBracketsWithBoldTag(x.description),
  examples: x.examples,
}))
