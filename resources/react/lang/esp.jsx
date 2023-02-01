export default {
    components: {
        Navbar: {
            txt1: 'Categorías',
            txt2: 'Ejercicios',
            txt3: 'Rutinas'
        },
        Table: {
            txt1: 'Nombre',
            txt2: 'Fecha de creación',
            txt3: 'Última actualización'
        }
    },
    pages: {
        Home: {
            txt1: '¿Preparado para',
            txt2: '- ponerte en forma?',
            txt3: 'Personalización',
            txt4: 'de ejercicios',
            txt5: 'Es el momento de concentrarse en uno mismo y ponerte de la mejor forma posible.',
            txt6: 'Comencemos'
        },
        Categories: {
            txt1: 'Añadir categoría',
            txt2: 'Categorías',
            txt3: 'Filtrar categorías...',
            txt4: str => `No hay categorías coincidentes con '${str}'`,
            txt5: "No has añadido ninguna categoría todavía.",
            txt6: "Puedes empezar haciendo click sobre 'Añadir categoría'.",
            txt7: 'Eliminar categorías',
            txt8: '¡Organízate!',
            txt9: 'Crea las categorías que más se adecúen a tus gustos y agrupa tus ejercicios como más te convenga.',
            txt10: 'Todo el mundo parte de una línea de salida diferente. ¿Con qué quieres empezar?'
        }
    }
}
