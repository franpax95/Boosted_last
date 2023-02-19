export default {
    components: {
        Modal: {
            txt1: 'Aceptar',
            txt2: 'Cancelar',
            txt3: 'Cerrar',
        },
        Navbar: {
            txt1: 'Categorías',
            txt2: 'Ejercicios',
            txt3: 'Rutinas'
        },
        Table: {
            txt1: 'Nombre',
            txt2: 'Fecha de creación',
            txt3: 'Última actualización',
            txt4: 'Imagen',
            txt5: 'Descripción',
            txt6: 'Categoría',
        },
    },
    contexts: {
        Categories: {
            txt1: 'Categoría insertada con éxito',
            txt2: 'No se ha podido insertar la categoría',
            txt3: 'Categoría editada con éxito',
            txt4: 'No se ha podido editar la categoría. Inténtelo de nuevo más tarde.',
            txt5: 'Categoría eliminada con éxito',
            txt6: 'No se ha podido eliminar la categoría. Inténtelo de nuevo más tarde.',
            txt7: 'Categorías eliminadas con éxito',
            txt8: 'No se han podido eliminar las categorías. Inténtelo de nuevo más tarde.'
        },
        Exercises: {
            txt1: 'Ejercicio insertado con éxito',
            txt2: 'No se ha podido insertar el ejercicio',
            txt3: 'Ejercicio editado con éxito',
            txt4: 'No se ha podido editar el ejercicio. Inténtelo de nuevo más tarde.',
            txt5: 'Ejercicio eliminado con éxito',
            txt6: 'No se ha podido eliminar el ejercicio. Inténtelo de nuevo más tarde.',
            txt7: 'Ejercicios eliminados con éxito',
            txt8: 'No se han podido eliminar los ejercicios. Inténtelo de nuevo más tarde.'
        },
    },
    pages: {
        Categories: {
            txt1: 'Añadir categoría',
            txt2: 'Categorías',
            txt3: 'Filtrar categorías...',
            txt4: str => `No hay categorías coincidentes con '${str}'`,
            txt5: 'No has añadido ninguna categoría todavía.',
            txt6: 'Puedes empezar haciendo click sobre \'Añadir categoría\'.',
            txt7: 'Eliminar categorías',
            txt8: '¡Organízate!',
            txt9: 'Crea las categorías que más se adecúen a tus gustos y agrupa tus ejercicios como más te convenga.',
            txt10: 'Todo el mundo parte de una línea de salida diferente. ¿Con qué quieres empezar?',
            txt11: 'Atención',
            txt12: 'No has seleccionado ninguna categoría',
            txt13: 'Si eliminas estas categorías no podrás recuperarlas. ¿Estás seguro de que deseas continuar?',
        },
        CategoriesAdd: {
            txt1: 'Formulario Categorías',
            txt2: 'Piensa bien cómo quieres agrupar tus ejercicios y añade tus categorías \'de golpe\'. ',
            txt3: '¡Siéntete libre de organizarte como más cómodo te sientas!',
            txt4: 'Añadir categoría',
            txt5: 'Añadir categorías',
            txt6: 'Guardar categorías',
            txt7: 'Añadir más categorías',
            txt8: 'Limpiar categorías',
            txt9: 'Categoría',
            txt10: 'Nombre de la categoría',
            txt11: 'Clonar esta categoría',
            txt12: 'Limpiar esta categoría',
            txt13: 'Eliminar esta categoría',
            txt14: 'Guardar',
            txt15: 'Más',
            txt16: 'Limpiar',
            txt17: 'Aviso',
            txt18: 'Ya has rellenado esta categoría. ¿Estás seguro de que quieres quitarlo?',
            txt19: 'Ya has rellenado algunas categorías y si sigues adelante las perderás. ¿Deseas continuar?',
            txt20: 'No se ha podido insertar la categoría',
            txt21: 'No se han podido insertar algunas categorías',
            txt22: 'Se ha insertado la categoría con éxito',
            txt23: 'Se han insertado las categorías con éxito',
        },
        Category: {
            txt1: 'Categoría',
            txt2: 'Nombre',
            txt3: 'Fecha de creación',
            txt4: 'Última actualización',
            txt5: 'Editar',
            txt6: 'Eliminar',
            txt7: 'Editar Categoría',
            txt8: 'Nombre de la categoría',
            txt9: 'Categoría',
            txt10: 'Guardar',
            txt11: 'Cancelar',
            txt12: 'Ejercicios asociados a la categoría',
            txt13: 'Filtrar ejercicios...',
            txt14: 'Añadir ejercicios',
            txt15: 'Eliminar ejercicios',
            txt16: 'No se encuentra la categoría que buscas...',
            txt17: 'Aviso',
            txt18: 'Vas a proceder a borrar la categoría. ¿Estás seguro de que deseas continuar?',
            txt19: 'Si continúas perderás los ejercicios asociados a esta categoría y no podrás recuperarlos. ¿Deseas continuar aun así?',
            txt20: 'Atención',
            txt21: 'No has seleccionado ningún ejercicio',
            txt22: 'Si eliminas estos ejercicios no podrás recuperarlos. ¿Estás seguro de que deseas continuar?',
        },
        Exercise: {
            txt1: '¡Ejercítate!',
            txt2: 'Recuerda que tanto la postura como la respiración son importantes cuando entrenas.',
            txt3: 'Construye tu cuerpo con trabajo y constancia.',
            txt4: 'Ejercicio',
            txt5: 'Nombre',
            txt6: 'Categoría',
            txt7: 'Descripción',
            txt8: 'Fecha creación',
            txt9: 'Última actualización',
            txt10: 'Editar ejercicio',
            txt11: 'Eliminar ejercicio',
            txt12: 'Editar ejercicio',
            txt13: 'Nombre del ejercicio',
            txt14: 'Ejercicio',
            txt15: 'Descripción del ejercicio',
            txt16: 'Descripción',
            txt17: 'Guardar cambios',
            txt18: 'Cancelar cambios',
            txt19: 'Atención',
            txt20: 'Si eliminas este ejercicio no podrás recuperarlo. ¿Estás seguro de que deseas continuar?',
            txt21: 'Imagen',
        },
        Exercises: {
            txt1: 'Añadir ejercicio',
            txt2: 'Ejercicios',
            txt3: 'Filtrar ejercicios...',
            txt4: str => `No hay ejercicios coincidentes con '${str}'`,
            txt5: 'No has añadido ningún ejercicio todavía.',
            txt6: 'Puedes empezar haciendo click sobre \'Añadir ejercicio\'.',
            txt7: 'Eliminar ejercicios',
            txt8: '¡Entrena!',
            txt9: 'Personaliza los ejercicios como más te guste y empieza a crear rutinas a partir de éstos.',
            txt10: '¡Tú eres tu propio límite y está en el cielo!',
            txt11: 'Atención',
            txt12: 'No has seleccionado ningún ejercicio',
            txt13: 'Si eliminas estos ejercicios no podrás recuperarlos. ¿Estás seguro de que deseas continuar?',
        },
        ExercisesAdd: {
            txt1: 'Añadir ejercicios',
            txt2: 'Los ejercicios son una parte fundamental para hacer las rutinas. Te recomendamos elegir una descripción comprensiva y una imagen descriptiva.',
            txt3: 'Guardar',
            txt4: 'Más',
            txt5: 'Limpiar',
            txt6: 'Categoría',
            txt7: 'Nombre de la categoría',
            txt8: 'Atención',
            txt9: 'Has rellenado este campo. ¿Estás seguro de que quieres quitarlo?',
            txt10: 'No se ha podido insertar la categoría',
            txt11: 'No se han podido insertar algunas categorías',
            txt12: 'Se ha insertado la categoría con éxito',
            txt13: 'Se han insertado las categorías con éxito',
            txt14: 'Atención',
            txt15: 'Ya has rellenado algunos campos y si sigues adelante los perderás. ¿Deseas continuar?',
        },
        Home: {
            txt1: '¿Preparado para',
            txt2: '- ponerte en forma?',
            txt3: 'Personalización',
            txt4: 'de ejercicios',
            txt5: 'Es el momento de concentrarse en uno mismo y ponerte de la mejor forma posible.',
            txt6: 'Comencemos'
        },
    }
}
