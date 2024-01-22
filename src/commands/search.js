import { getVacancies, getVacanciesByRegion } from "../api/vacancies.js";

export class SearchCommand {
    constructor(bot) {
        this.bot = bot;
    }

    exec() {
        this.bot.command("search", async (ctx) => {
            try {
                const { regionCode, ...query } = ctx.session.filters || {};

                const { vacancies } = regionCode
                    ? await getVacanciesByRegion(regionCode, query)
                    : await getVacancies(query);

                if (!vacancies.length) {
                    return ctx.reply("К сожалению, ничего не найдено");
                }

                for (const { vacancy } of vacancies) {
                    ctx.replyWithMarkdown(buildMessage(vacancy));
                }
            } catch (error) {
                ctx.reply("К сожалению, произошла ошибка");
            }
        });
    }
}

const buildMessage = (vacancy) => {
    return (
        `💡 *${vacancy["job-name"]}*\n` +
        `💸 ${vacancy.salary || "Не указано"}\n` +
        `🏙 ${vacancy.company.name}\n\n` +
        `🌎 [Подробнее](${vacancy.vac_url})`
    );
};
