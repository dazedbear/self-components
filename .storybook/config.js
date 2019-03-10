import { configure, addDecorator } from "@storybook/react";
import { withPropsTable } from "storybook-addon-react-docgen";
import { withOptions } from "@storybook/addon-options";
import './style.css';

const loadStories = () => {
  const req = require.context("../src", true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
};

// 爬取 propTypes
addDecorator(withPropsTable);

// 調整 storybook 外觀
addDecorator(
  withOptions({
    name: "自己的 Storybook",
  })
);

configure(loadStories, module);