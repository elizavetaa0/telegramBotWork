import { Scenes } from "telegraf";

export const setTextScene = new Scenes.BaseScene("setText");

setTextScene.enter((ctx) => {
    ctx.reply("Укажите ключевое слово для поиска");
});

setTextScene.on("message", (ctx) => {
    ctx.session.newFilters.text = ctx.message.text;

    ctx.reply(`Фильтр успешно применен - ${ctx.message.text}`);

    return ctx.scene.enter("pickFilter");
});