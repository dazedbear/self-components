import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { doc } from 'storybook-readme';
import Card from './card';
import readme from './readme.md';
import selfImage from './image/cover.jpg';
import bgImage from './image/bg.png';

export const data = {
  link: 'https://www.google.com',
  linkTitle: 'Google',
  defultUserImage: '',
  defultBgImage: '',
  userImage: selfImage,
  bgImage: bgImage,
  userName: '孫悟空',
  introduction: '孫悟空，是小說《西遊記》中主要角色之一。又名孫行者，自封花果山美猴王、齊天大聖。曾任天官弼馬溫。玉帝後來為了招安孫悟空，承認了他自封的封號齊天大聖。取經後為如來佛祖授為鬪戰勝佛。'
};

storiesOf('卡片', module)
  .addDecorator(story => <div style={{ padding: '25px' }}>{story()}</div>)
  .add('使用文件', doc(readme))
  .add('default', () =>
    <Card
      key="1"
      link={data.link}
      linkTitle={data.linkTitle}
      userImage={data.userImage}
      bgImage={data.bgImage}
      userName={data.userName}
      introduction={data.introduction}
    />
  );
