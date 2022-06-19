const PostgreSQLAdapter = require("../../util/PostgreSQLAdapter");

module.exports = class BeforeEach {

    static async run() {

        const CLEAR_ALL_TABLES = `
            DELETE FROM public.account;
            DELETE FROM public.role;
            DELETE FROM public.permission;
            DELETE FROM public.account_role;
            DELETE FROM public.privilege;
        `;

        await PostgreSQLAdapter.executeQuery(CLEAR_ALL_TABLES);
    };
}
