export type Block = {
  label: string;
  content: string;
  trigger?: 'modal';
  id?: any;
  iconClass?: string;
};

export type BlockSection = {
  title: string;
  blocks: Block[];
};

const blocks: BlockSection[] = [
  {
    title: 'Profile readme',
    blocks: [
      {
        label: 'Greeting',
        content: `# Hello, I'm (name) :wave:`,
      },
      {
        label: 'Connect with me',
        content: `## :speech_balloon: How to reach me? \n\n - [Email](href) \n - [LinkedIn](href) \n - [Website](href)`,
      },
      {
        label: 'Working on',
        content: `## :factory: I'm working on \n\n - :file_folder: [Project1](href): *description* \n - :file_folder: [Project2](href): *description* \n - :file_folder: [Project3](href): *description*`,
      },
      {
        label: 'Languages',
        content: '',
        trigger: 'modal',
        id: '#languages-frameworks-libraries-0',
        iconClass: 'bi bi-code-slash',
      },
    ],
  },
  {
    title: 'Basic',
    blocks: [
      {
        label: 'H1 Heading',
        content: '# H1 heading',
      },
      {
        label: 'H2 Heading',
        content: '## H2 heading',
      },
      {
        label: 'H3 Heading',
        content: '### H3 heading',
      },
      {
        label: 'Link',
        content: '[label](href)',
      },
      {
        label: 'Image',
        content: '![alt](src)',
      },
      {
        label: 'Table',
        content: `
| H | H | H | H |
| :---: | :---: | :---: | :---: |
|  |  |  | |
    `,
      },
      {
        label: 'Code block',
        content: '``` \n\n```',
      },
      {
        label: 'Inline code',
        content: '` `',
      },
    ],
  },
];

export default blocks;
