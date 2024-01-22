import { Scenes } from "telegraf";

export const setRegionCodeScene = new Scenes.BaseScene("setRegionCode");

setRegionCodeScene.enter((ctx) => {
  return ctx.reply(`Укажите код региона для поиска`);
});

setRegionCodeScene.on('message', (ctx) => {
  ctx.session.newFilters.regionCode = ctx.message.text;

  ctx.reply(`Фильтр успешно применен. Поиск по ${ctx.message.text}`);

  return ctx.scene.enter("pickFilter");
});
