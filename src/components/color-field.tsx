import { AccessibleIcon, Box, Flex, IconButton, TextField } from "@radix-ui/themes";
import { Chrome } from "@uiw/react-color";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineErrorOutline, MdOutlineShuffle } from "react-icons/md";

import { getRandomColor, isValidColor, colorToHex } from "~/utils/color";

type ColorFieldProps = {
  id?: string;
  name: string;
  size?: "1" | "2" | "3";
  placeholder?: string;
  value: string;
  onChange: (color: string) => void;
};

export function ColorField(props: ColorFieldProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const textInputValid = isValidColor(props.value);
  const showWarning = props.value.length > 2 && !textInputValid;
  const colorOrFallback = colorToHex(textInputValid ? props.value : "white");

  return (
    <Box position="relative">
      <TextField.Root
        type="text"
        id={props.id || props.name}
        name={props.name}
        size={props.size}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setPickerOpen(true)}
        onBlur={() => setPickerOpen(false)}
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
            onClick={() => props.onChange(getRandomColor().hex())}
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
              onChange={(c) => props.onChange(c.hex)}
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
