import { FormControlProps, FormControlValidationRules } from "@/types/form";
import React, { useMemo, useRef } from "react";
import SkillItem from "./SkillItem";
import { useValidator } from "@/hooks/useForm";
import { v4 as uuid } from "uuid";

type SkillSelection = Record<string, boolean>;

interface SkillProps extends FormControlProps {
  items: string[];
  onChange: (newSelection: SkillSelection) => void;
  value: SkillSelection;
  validation?: Pick<FormControlValidationRules, "oneOf">;
  label?: string;
}

function Skills({ items, validation, label, onChange, value }: SkillProps) {
  const id = useRef(uuid());
  const skills = useMemo(() => {
    const skills: SkillSelection = {};

    for (const skill of items) {
      skills[skill] = value[skill] ?? false;
    }

    return skills;
  }, [items, value]);

  const validationValue = useMemo(
    () => Object.keys(value).filter((skillName) => skills[skillName]),
    [value]
  );

  const { validate } = useValidator(
    validationValue,
    id.current,
    label ?? "Skills",
    validation
  );

  function toggleSkill(skillName: string, status: boolean) {
    const newSelection = { ...skills };
    newSelection[skillName] = status;

    validate();

    onChange(newSelection);
  }

  return (
    <div className="skills">
      {Object.keys(skills).map((skill) => (
        <SkillItem
          label={skill}
          key={skill}
          checked={skills[skill]}
          onChange={(checked) => toggleSkill(skill, checked as boolean)}
        />
      ))}
    </div>
  );
}

export default Skills;
