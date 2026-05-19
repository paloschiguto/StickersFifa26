export function applyFilters(
    stickers,
    filters
) {

    return stickers.filter(sticker => {

        const matchesSearch =

            sticker.code
                .toLowerCase()
                .includes(
                    filters.search.toLowerCase()
                )

            ||

            sticker.country
                .toLowerCase()
                .includes(
                    filters.search.toLowerCase()
                );

        const matchesGroup =

            !filters.group

            ||

            sticker.group === filters.group;

        const matchesCountry =

            !filters.country

            ||

            sticker.country === filters.country;

        const matchesStatus =

            filters.status === "all"

            ||

            (
                filters.status === "missing"
                &&
                !sticker.have
            )

            ||

            (
                filters.status === "owned"
                &&
                sticker.have
            );

        return (
            matchesSearch
            &&
            matchesGroup
            &&
            matchesCountry
            &&
            matchesStatus
        );
    });
}