export default {
    components: {
        Modal: {
            txt1: 'Accept',
            txt2: 'Cancel',
            txt3: 'Close',
        },
        Navbar: {
            txt1: 'Categories',
            txt2: 'Exercises',
            txt3: 'Routines'
        },
        Table: {
            txt1: 'Name',
            txt2: 'Created at',
            txt3: 'Updated at',
            txt4: 'Image',
            txt5: 'Description',
            txt6: 'Category',
        },
    },
    contexts: {
        Categories: {
            txt1: 'Category inserted successfully',
            txt2: 'Could not insert category',
            txt3: 'Category edited successfully',
            txt4: 'Could not edit category. Try it again later.',
            txt5: 'Category successfully removed',
            txt6: 'The category could not be deleted. Try it again later.',
            txt7: 'Categories removed successfully',
            txt8: 'The categories could not be deleted. Try it again later.'
        },
        Exercises: {
            txt1: 'Exercise inserted successfully',
            txt2: 'Could not insert exercise',
            txt3: 'Exercise edited successfully',
            txt4: 'Could not edit exercise. Try it again later.',
            txt5: 'Exercise successfully removed',
            txt6: 'The exercise could not be deleted. Try it again later.',
            txt7: 'Exercises removed successfully',
            txt8: 'The exercises could not be deleted. Try it again later.'
        },
    },
    pages: {
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
            txt10: 'Everyone starts from a different starting line. What do you want to start with?',
            txt11: 'Warning',
            txt12: 'Select some categories first',
            txt13: 'If you delete these categories you will not be able to recover them. Are you sure you want to continue?',
        },
        CategoriesAdd: {
            txt1: 'Categories Form',
            txt2: 'Think carefully about how you want to group your exercises and add your categories \'at once\'.',
            txt3: 'Feel free to organize yourself in the most comfortable way possible!',
            txt4: 'Add category',
            txt5: 'Add categories',
            txt6: 'Save categories',
            txt7: 'Add more categories',
            txt8: 'Clear categories',
            txt9: 'Category',
            txt10: 'Category name',
            txt11: 'Clone this category',
            txt12: 'Clear this category',
            txt13: 'Delete this category',
            txt14: 'Save',
            txt15: 'More',
            txt16: 'Clear',
            txt17: 'Warning',
            txt18: 'You have already filled this category. Are you sure you want to remove it?',
            txt19: 'You have already filled in some categories and if you go ahead you will lose them. Do you want to continue?',
            txt20: 'Could not insert category',
            txt21: 'Some categories could not be inserted',
            txt22: 'The category has been inserted successfully',
            txt23: 'The categories have been inserted successfully',
            txt24: 'You have already filled this category. Are you sure you want to reset it?',
        },
        Category: {
            txt1: 'No excuses!',
            txt2: 'The only bad workout is the one that didn\'t happen.',
            txt3: 'If it doesn\'t challenge you, it doesn\'t change you...',
            txt4: 'Category',
            txt5: 'Name',
            txt6: 'Created at',
            txt7: 'Updated at',
            txt8: 'Image',
            txt9: 'Edit category',
            txt10: 'Delete category',
            txt11: 'Edit category',
            txt12: 'Category name...',
            txt13: 'Category',
            txt14: 'Save changes',
            txt15: 'Cancel changes',
            txt16: 'Category not found...',
            txt17: 'Warning',
            txt18: 'You are going to proceed to delete the category. Are you sure you want to continue?',
            txt19: 'All exercises associated with the category will be deleted. Do you want to continue?',
            txt20: 'There aren\'t exercises selected.',
            txt21: 'If you delete these exercises you will not be able to recover them. Are you sure you want to continue?',
            txt22: 'Add exercises',
            txt23: 'Delete exercises',
            txt24: 'Exercises related with the category',
            txt25: 'Filter exercises...',
        },
        Exercise: {
            txt1: 'Exercise yourself!',
            txt2: 'Remember that both posture and breathing are important when you are training.',
            txt3: 'Build your body with work and perseverance.',
            txt4: 'Exercise',
            txt5: 'Name',
            txt6: 'Category',
            txt7: 'Descrption',
            txt8: 'Created at',
            txt9: 'Updated at',
            txt10: 'Image',
            txt11: 'Edit exercise',
            txt12: 'Delete exercise',
            txt13: 'Edit exercise',
            txt14: 'Exercise name',
            txt15: 'Exercise',
            txt16: 'Category',
            txt17: 'Choose a category',
            txt18: 'Exercise description',
            txt19: 'Descrption',
            txt20: 'Save changes',
            txt21: 'Cancel changes',
            txt22: 'Warning',
            txt23: 'If you delete this exercise you will not be able to recover it. Are you sure you want to continue?',
            txt24: 'This exercise is part of one or more routines, and if you delete it, it will also be deleted in them. Are you sure you want to continue?',
            txt25: 'You have not selected any routine.',
            txt26: 'If you delete these routines you will not be able to recover them. Are you sure you want to continue?',
            txt27: 'Exercise not found...',
        },
        Exercises: {
            txt1: 'Add exercise',
            txt2: 'Exercises',
            txt3: 'Filter exercises...',
            txt4: str => `The are no exercises matching '${str}'`,
            txt5: "You haven't added any exercises yet.",
            txt6: "Start by clicking the 'Add exercise' button.",
            txt7: 'Delete exercises',
            txt8: 'Train!',
            txt9: 'Customize the exercises as you like and start creating routines from them.',
            txt10: 'You are your own limit and it is in the sky!',
            txt11: 'Warning',
            txt12: 'Select some exercises first',
            txt13: 'If you delete these exercises you will not be able to recover them. Are you sure you want to continue?',
        },
        ExercisesAdd: {
            txt1: 'Add Exercises',
            txt2: 'Be sure to choose a description and image that you understand and help you do the exercise.',
            txt3: 'If you fail to prepare, you\'re prepared to fail.',
            txt4: 'Add exercise',
            txt5: 'Add exercises',
            txt6: 'Save exercises',
            txt7: 'Add more exercises',
            txt8: 'Clear exercise',
            txt9: 'Exercise',
            txt10: 'Exercise name',
            txt11: 'Category',
            txt12: 'Choose a category',
            txt13: 'Description',
            txt14: 'Type here the exercise description',
            txt15: 'Clone this exercise',
            txt16: 'Clear this exercise',
            txt17: 'Delete this exercise',
            txt18: 'Save',
            txt19: 'More',
            txt20: 'Clear',
            txt21: 'Warning',
            txt22: 'You have already completed this exercise. Are you sure you want to remove it?',
            txt23: 'You have already filled in some exercises and if you keep going you will lose them. Do you want to continue?',
            txt24: 'You have already completed this exercise. Are you sure you want to reset it?',
            txt25: 'The exercise could not be inserted',
            txt26: 'Some exercises could not be inserted',
            txt27: 'The exercise has been inserted successfully',
            txt28: 'The exercises have been inserted successfully',
        },
        Home: {
            txt1: 'Ready to',
            txt2: '- get fit?',
            txt3: 'Workout',
            txt4: 'personalization',
            txt5: 'Now is a good a time as any to focus on getting your body into the best shape possible.',
            txt6: "Let's begin"
        },
    }
}
