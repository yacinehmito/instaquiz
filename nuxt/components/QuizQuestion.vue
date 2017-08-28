<template>
  <div>
    <div>
      {{ question }}
    </div>
    <label
      :class="{
        [$style.answer]: true,
        [$style.selected]: selection[answer.id],
        [$style.focused]: focus[answer.id]
      }"
      v-for="answer of answers"
      :key="answer.id"
    >
      <input
        type="checkbox"
        :disabled="locked"
        :checked="selection[answer.id]"
        @change="selection[answer.id] = $event.target.checked"
        v-focus="focus[answer.id]"
        @focus="focus[answer.id] = true"
        @blur="focus[answer.id] = false"
        @keyup.enter="selection[answer.id] = !selection[answer.id]"
      >
        {{ answer.text }}
    </label>
  </div>
</template>

<script>
function generateMapFalse(answers) {
  const map = {}
  answers.forEach(answer => (map[answer.id] = false))
  return map
}

export default {
  props: {
    // Whether the user can still modify the answers
    locked: {
      type: Boolean,
      default: false
    },
    // Array of objects with properties id and text
    answers: {
      type: Array,
      default: []
    },
    question: String
  },
  data() {
    return {
      // Keys are answers ids; Values are objects with input state
      focus: generateMapFalse(this.answers),
      selection: generateMapFalse(this.answers)
    }
  },
  computed: {
    selectedAnswers() {
      return Object.keys(this.selection).filter(id => this.selection[id])
    }
  },
  watch: {
    answers() {
      // When answers change we assume it means that a new question is given
      ;(this.focus = generateMapFalse(
        this.answers
      )), (this.selection = generateMapFalse(this.answers))
    },
    selectedAnswers() {
      this.$emit('change', this.selectedAnswers)
    },
    locked() {
      // When locked, emit an event with the ids of the selected answers
      if (this.locked) {
        this.$emit('lock', this.selectedAnswers)
      }
    }
  }
}
</script>

<style module>

.answer > input {
  appearance: none;
  width: 0;
  height: 0;
}

.answer {
  display: block;
  user-select: none;
}

.selected::before {
  content: '✓'
}

.focused {
  border: 1px solid gray;
}
</style>
