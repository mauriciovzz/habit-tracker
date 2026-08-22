export const es = {
  appTitle: "Habitos",
  NoHabitsMessage: "Agrega un habito haciendo clic en +",

  rotate: "Gira tu dispositivo",
  rotateDesc:
    "Esta app está diseñada para usarse en modo vertical en pantallas pequeñas",

  edit: "Editar",
  back: "Volver",

  metrics: {
    streak: "Racha",
    percentage: "Porcentaje",
    total: "Total",
  },

  daysOfWeek: ["Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sab.", "Dom."],

  months: {
    full: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    short: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },

  resetHabit: "Restablecer",
  resetPrompt: "¿Quieres restablecer este habito?",
  deleteHabit: "Eliminar",
  deletePrompt: "¿Quieres eliminar este habito?",
  no: "No",
  yes: "Si",

  resetLog: "Reiniciar",
  fulfillLog: "Completar",

  addHabit: "Agregar Habito",
  editHabit: "Editar Habito",
  name: "Nombre",
  repsDay: "Reps. por dia",
  save: "Guardar",
  update: "Actualizar",

  settings: "Ajustes",

  manageData: "Administrar Datos",
  manageDataPrompt: "Descarga, carga o eliminar tus datos",

  downloadData: "Descargar datos de la aplicación",
  downloadDataPrompt: "Obten tus datos para trasladarlos",

  uploadData: "Carga nuevos datos en la aplicación",
  uploadDataPrompt: "Reemplaza los datos en este dispositivo",

  uploadTitle: "Carga de datos",
  selectJson: "Seleccione un archivo JSON",

  fileWaiting: "Esperando por un archivo",
  fileSuccess:
    "Presionar importar reemplazarán los datos existentes con los datos de este archivo",
  fileError: "Archivo inválido",

  deleteData: "Eliminar datos de la aplicación",
  DeleteDataPrompt: "Borra todos los datos en este dispositivo",
  DeleteDataQuestion: "¿Eliminar todos los datos?",

  reorderHabits: "Reordenar Habitos",
  reorderHabitsPrompt: "Cambia el orden de tus hábitos",
  reorderHabitsDescription: "Arrastra un hábito para cambiar su posición",
  noHabitsReorder: "No hay habitos para reordenar",

  lang: "Español",

  help: {
    title: "Ayuda",

    index: {
      devBy: "Desarrollado por Mauricio Velázquez",
      tools: "con React, TypeScript, Mantine y Dexie.js",
    },

    trackingHabits: {
      heading: "Seguimiento de hábitos",
      description:
        "Tus hábitos aparecen en la pantalla principal. Las tres columnas representan <strong>anteayer, ayer y hoy.</strong>",
      habitButton:
        "Toca el botón de un hábito para añadir un registro para ese día. El círculo muestra tu progreso hacia el objetivo diario.",
      reachGoal:
        "Cuando alcanzas el objetivo, el hábito se marca como completado. Puedes seguir añadiendo registros después de alcanzar el objetivo.",
    },

    dailyGoal: {
      heading: "Objetivo diario",
      description:
        "El <strong>objetivo diario</strong> indica cuántas veces quieres realizar un hábito cada día.",
      limit:
        "Puedes establecer un objetivo de <strong>1 a 100 registros por día.</strong>",
      example:
        "Por ejemplo, con un objetivo de 3, tres registros completan el objetivo del día. Puedes seguir registrando más veces si realizas el hábito más veces.",
    },

    checks: {
      heading: "Administrar los registros de un día",
      description:
        "<strong>Mantén pulsado el botón de un hábito</strong> para abrir el editor de registros de ese día.",
      actions: "Desde el editor puedes:",
      actionsList: [
        "Añadir o eliminar registros.",
        "Restablecer los registros del día a cero.",
        "Completar el objetivo del día inmediatamente.",
      ],
    },

    habitDetails: {
      heading: "Detalles del hábito",
      description:
        "Toca un hábito para abrir sus detalles. En esta ventana puedes consultar:",
      sections: [
        "<strong>Racha actual:</strong> cuántos días consecutivos has completado el hábito.",
        "<strong>Porcentaje de cumplimiento:</strong> el porcentaje de días en los que has completado el hábito.",
        "<strong>Total de registros:</strong> el número total de veces que has registrado el hábito.",
      ],
      calendar:
        "Usa el <strong>calendario</strong> para consultar y administrar tu hábito en fechas específicas. Toca una fecha para abrir el editor de registros de ese día.",
      heatmap:
        "El <strong>mapa de actividad</strong> muestra tu actividad durante el último año, permitiéndote ver tu progreso de un vistazo.",
    },

    managingHabits: {
      heading: "Administrar hábitos",
      description:
        "Usa el botón + para crear un hábito. Puedes elegir su nombre, color y objetivo diario.",
      edit: "Desde los detalles de un hábito puedes cambiar su nombre, color u objetivo diario.",
      reset:
        "<strong>Restablecer progreso</strong> elimina todos los registros, pero mantiene el hábito.",
      delete:
        "<strong>Eliminar hábito</strong> elimina permanentemente el hábito y todo su progreso.",
    },

    settings: {
      heading: "Configuración y Datos",
      description:
        "Tus datos se almacenan localmente en este dispositivo. No necesitas una cuenta.",
      download:
        "<strong>Descargar datos</strong> crea una copia de seguridad de tus hábitos y progreso que puedes guardar o utilizar en otro dispositivo.",
      load: "<strong>Cargar datos</strong> importa una copia de seguridad descargada anteriormente.",
      reorder:
        "<strong>Reordenar hábitos</strong> te permite cambiar el orden de tus hábitos arrastrándolos.",
      delete:
        "<strong>Eliminar todos los datos</strong> elimina permanentemente todos los hábitos y su progreso de la aplicación.",
      bottomBar:
        "Usa los botones de la parte inferior para cambiar entre <strong>modo claro y oscuro</strong> o entre <strong>inglés y español.</strong>",
    },

    installation: {
      heading: "Instalar la Aplicación",

      android: {
        heading: "Android (Chrome)",
        steps: [
          "Abre el juego en Google Chrome.",
          "Toca el menú ⋮ (tres puntos) en la esquina superior derecha.",
          'Selecciona "Instalar aplicación" o "Agregar a la pantalla principal".',
          'Pulsa "Instalar" para confirmar.',
          "El juego se añadirá a tu pantalla de inicio y podrás abrirlo como cualquier otra aplicación.",
        ],
        tips: "En algunos dispositivos Android, Chrome mostrará automáticamente un aviso para instalar la aplicación cuando esté disponible.",
      },

      ios: {
        heading: "iPhone y iPad (Safari)",
        steps: [
          "Abre el juego en Safari.",
          "Toca el botón Compartir (el cuadrado con una flecha hacia arriba).",
          'Desplázate hacia abajo y selecciona "Agregar a pantalla de inicio".',
          "Si lo deseas, cambia el nombre de la aplicación.",
          'Pulsa "Agregar". El juego aparecerá en tu pantalla de inicio y podrás abrirlo como una aplicación nativa.',
        ],
        tips: "En iPhone y iPad solo es posible instalar aplicaciones web desde Safari.",
      },
    },
  },
} as const;
