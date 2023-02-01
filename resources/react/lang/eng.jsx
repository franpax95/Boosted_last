export default {
    components: {
        Navbar: {
            txt1: 'Categories',
            txt2: 'Exercises',
            txt3: 'Routines'
        },
        Table: {
            txt1: 'Name',
            txt2: 'Created at',
            txt3: 'Updated at'
        }
    },
    pages: {
        Home: {
            txt1: 'Ready to',
            txt2: '- get fit?',
            txt3: 'Workout',
            txt4: 'personalization',
            txt5: 'Now is a good a time as any to focus on getting your body into the best shape possible.',
            txt6: "Let's begin"
        },
        Categories: {
            txt1: 'Add category',
            txt2: 'Categories',
            txt3: 'Filter categories...',
            txt4: str => `The are no categories matching '${str}'`,
            txt5: "You haven't added any categories yet.",
            txt6: "Start by clicking the 'Add category' button.",
            txt7: 'Delete categories',
            txt8: 'Get organized!',
            txt9: 'Create the categories that best suit your needs and group your exercises as you see fit.',
            txt10: 'Everyone starts from a different starting line. What do you want to start with?'
        }
    }
}
