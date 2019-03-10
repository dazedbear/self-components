import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import react from './react.md';
import storybook from './storybook.md';
import cleanCode from './cleanCode.md';
import immutable from './immutable.md';


storiesOf('文件', module)
  .add('React Development', doc(react))
  .add('Storybook Development', doc(storybook))
  .add('Immutable', doc(immutable))
  .add('5 Tips to Write Better Conditionals in JavaScript', doc(cleanCode))