export const en = {
  appTitle: "Habits",
  NoHabitsMessage: "Add an habit clicking on +",

  rotate: "Rotate your device",
  rotateDesc:
    "This app is designed to be used in portrait mode on smaller screens",

  windowHeight: "Window too small",
  windowHeightDesc: "Make the window taller to continue",

  edit: "Edit",
  back: "Back",

  metrics: {
    streak: "Streak",
    percentage: "Percentage",
    total: "Total",
  },

  daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  months: {
    full: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },

  resetHabit: "Reset",
  resetPrompt: "Do you want to reset this habit?",
  deleteHabit: "Delete",
  deletePrompt: "Do you want to delete this habit?",
  no: "No",
  yes: "Yes",

  resetLog: "Reset",
  fulfillLog: "Fulfill",

  addHabit: "Add Habit",
  editHabit: "Edit Habit",
  name: "Name",
  repsDay: "Reps per day",
  save: "Save",
  update: "Update",

  settings: "Settings",

  downloadData: "Download app data",
  downloadDataPrompt: "Get your data to use it in other devices",

  uploadData: "Upload new app data",
  uploadDataPrompt: "Replace the data in this device",

  uploadTitle: "Data upload",
  selectJson: "Select a JSON File",

  fileWaiting: "Waiting for a file",
  fileSuccess:
    "Clicking Import will replace your existing data with the data from this file",
  fileError: "Invalid file",

  deleteData: "Delete app data",
  DeleteDataPrompt: "Erase all habit data from this device",
  DeleteDataQuestion: "Do you want to delete all data?",

  reorderHabits: "Reorder Habits",
  reorderHabitsPrompt: "Change the order of your habits",
  reorderHabitsDescription: "Drag an habit to change it's position",
  noHabitsReorder: "No habits to reorder",

  upToDate: "App is up to date",
  upToDatePrompt: "You are using the latest version",
  updateAvailable: "Update available",
  updateAvailablePrompt: "Click to update",

  lang: "English",

  help: {
    title: "Help",

    index: {
      devBy: "Developed by Mauricio Velázquez",
      tools: "with React, TypeScript, Mantine and Dexie.js",
    },

    trackingHabits: {
      heading: "Tracking habits",
      description:
        "Your habits are shown on the main screen. The three columns represent <strong>two days ago, yesterday, and today.</strong>",
      habitButton:
        "Tap a habit button to add one check for that day. The ring shows your progress toward the daily goal.",
      reachGoal:
        "When you reach the goal, the habit is marked as completed. You can continue adding checks after reaching the goal.",
    },

    dailyGoal: {
      heading: "Daily goal",
      description:
        "The <strong>daily goal</strong> is the number of times you want to complete a habit each day.",
      limit:
        "You can set a goal from <strong>1 to 100 checks per day.</strong>",
      example:
        "For example, with a goal of 3, three checks complete the day's goal. You can still record additional checks if you do the habit more times.",
    },

    checks: {
      heading: "Managing a day's checks",
      description:
        "<strong>Long press a habit button</strong> to open the log editor for that day.",
      actions: "From the editor, you can:",
      actionsList: [
        "Add or remove checks.",
        "Reset the day's checks to zero.",
        "Fulfill the day's goal immediately.",
      ],
    },

    habitDetails: {
      heading: "Habit details",
      description:
        "Tap a habit to open its details. In this window you can check:",
      sections: [
        "<strong>Current streak:</strong> how many consecutive days you have completed the habit.",
        "<strong>Completion:</strong> the percentage of days on which you have completed the habit.",
        "<strong>Total checks:</strong> the total number of checks you have recorded.",
      ],
      calendar:
        "Use the <strong>calendar</strong> to view and manage your habit on specific dates. Tap a date to open the log editor for that date.",
      heatmap:
        "The <strong>heatmap</strong> shows your activity over the past year, allowing you to see your progress at a glance.",
    },

    managingHabits: {
      heading: "Managing habits",
      description:
        "Use the + button to create a habit. You can choose its name, color, and daily goal.",
      edit: "From a habit's details, you can edit its name, color, or daily goal.",
      reset:
        "<strong>Reset progress</strong> removes all checks while keeping the habit.",
      delete:
        "<strong>Delete habit</strong> permanently removes the habit and its progress.",
    },

    settings: {
      heading: "Settings & Data",
      description:
        "Your data is stored locally on this device. No account is required.",
      download:
        "<strong>Download data</strong> creates a backup of your habits and progress that you can keep or use on another device.",
      load: "<strong>Load data</strong> imports a previously downloaded backup.",
      reorder:
        "<strong>Reorder habits</strong> lets you change the order of your habits by dragging them.",
      delete:
        "<strong>Delete all</strong> data permanently removes all habits and progress from the app.",
      bottomBar:
        "Use the buttons at the bottom to switch between <strong>light and dark mode</strong> or between <strong>English and Spanish.</strong>",
    },

    updates: {
      heading: "Updating the Application",
      description:
        "The application checks for new versions when you open Settings. If an update is available, the <strong>Update available</strong> button will be enabled.",
      update:
        "Tap <strong>Update available</strong> to install the newest version of the application. The app will reload automatically after the update.",
      latest:
        "If the application is up to date, the update button will be disabled and show <strong>App is up to date</strong>.",
    },

    installation: {
      heading: "Install the App",

      android: {
        heading: "Android (Chrome)",
        steps: [
          "Open the app in Google Chrome.",
          "Tap the ⋮ (three dots) menu in the top-right corner.",
          'Select "Install app" or "Add to Home screen".',
          'Tap "Install" to confirm.',
          "The app will be added to your home screen and can be launched like any other app.",
        ],
        tips: "On some Android devices, Chrome may automatically display an Install banner when the app is available.",
      },

      ios: {
        heading: "iPhone & iPad (Safari)",
        steps: [
          "Open the app in Safari.",
          "Tap the Share button (the square with an upward arrow).",
          'Scroll down and tap "Add to Home Screen".',
          "Optionally, edit the app name.",
          'Tap "Add". The app will appear on your home screen and can be opened like a native app.',
        ],
        tips: "Installing the app on iOS only works in Safari.",
      },

      desktop: {
        heading: "Desktop",
        steps: [
          "Open the application in a supported browser.",
          "Look for the install icon in the address bar.",
          'Click the install icon and select "Install".',
          "The application will be installed and you can open it like a regular desktop application.",
        ],
        tips: "The installation option may look different depending on your browser. If you don't see an install option, your browser may not support installing the application.",
      },
    },
  },
} as const;
