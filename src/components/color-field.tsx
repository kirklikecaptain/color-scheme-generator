import { AccessibleIcon, Box, Flex, IconButton, TextField } from "@radix-ui/themes";
import { Chrome, type ColorResult } from "@uiw/react-color";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ChangeEvent } from "react";
import { MdOutlineErrorOutline, MdOutlineShuffle } from "react-icons/md";

import { randomColor, isValidColor, colorToHex } from "~/utils/color";

type ColorFieldProps = {
  id?: string;
  name: string;
  size?: "1" | "2" | "3";
  placeholder?: string;
  initialValue?: string;
  onChange?: (color: string) => void;
};

export function ColorField(props: ColorFieldProps) {
  const [textInput, setTextInput] = useState(props.initialValue || "");
  const [pickerOpen, setPickerOpen] = useState(false);

  function updateColor(newColor: string) {
    setTextInput(newColor);
    props.onChange?.(newColor);
  }

  const generateNewColor = () => updateColor(randomColor());
  const onColorPickerChange = (c: ColorResult) => updateColor(c.hex);
  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => updateColor(e.target.value);
  const onTextFieldFocus = () => setPickerOpen(true);
  const onTextFieldBlur = () => setPickerOpen(false);

  const textInputValid = isValidColor(textInput);
  const colorOrFallback = colorToHex(textInputValid ? textInput : "white");
  const showWarning = textInput.length > 2 && !textInputValid;

  return (
    <Box position="relative">
      <TextField.Root
        type="text"
        id={props.id || props.name}
        name={props.name}
        size={props.size}
        placeholder={props.placeholder}
        value={textInput}
        onChange={onTextFieldChange}
        onFocus={onTextFieldFocus}
        onBlur={onTextFieldBlur}
      >
        <TextField.Slot side="left">
          {showWarning ? (
            <AccessibleIcon label="Invalid Color">
              <MdOutlineErrorOutline color="var(--red-10)" />
            </AccessibleIcon>
          ) : (
            <Flex
              width="1em"
              height="1em"
              style={{
                borderRadius: "var(--radius-1)",
                border: "solid 1px var(--base-card-classic-border-color)",
                backgroundColor: colorOrFallback,
              }}
            />
          )}
        </TextField.Slot>
        <TextField.Slot side="right">
          <IconButton
            color="gray"
            variant="ghost"
            size="1"
            aria-label="Random Color"
            type="button"
            onClick={generateNewColor}
          >
            <MdOutlineShuffle />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            style={{ position: "absolute", top: "calc(100% + 0.25rem)", left: 0, width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            <Chrome
              style={{ borderRadius: "var(--radius-3)", overflow: "hidden", width: "100%" }}
              color={colorOrFallback}
              onChange={onColorPickerChange}
              showAlpha={false}
              showColorPreview={false}
              showEditableInput={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
