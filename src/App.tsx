import { useState } from "react";

import styled, { css } from "styled-components";
import { Popup } from "./Popup";
import { Button } from "./Components/Button";
import { Checkbox } from "./Components/Checkbox";
import { Input } from "./Components/Input";
import { Tag } from "./Components/Tag";
import { TextButton } from "./Components/TextButton";

const MaxTaxReduction = 260000;
const DoMath = (salary: number) => {
  const salaryPerYear = salary * 12;
  const yearlyTaxReduction = salaryPerYear * 0.13;
  const fullYears = Math.floor(MaxTaxReduction / yearlyTaxReduction);
  const lastYear = MaxTaxReduction - fullYears * yearlyTaxReduction;
  const array = [...Array(fullYears)].fill(yearlyTaxReduction);
  array.push(lastYear);
  return array as number[];
};

function App() {
  const [show, setShow] = useState(false);
  const [salary, setSalary] = useState(0);
  const [error, setError] = useState('')
  const [taxReductionPerYear, setTaxReductionPerYear] = useState(
    [] as number[]
  );
  return (
    <AppContainer>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Налоговый вычет
      </Button>
      {show && (
        <Popup onCross={() => setShow(false)}>
          <FormContainer>
            <Heading>Налоговый вычет</Heading>
            <Info>
              Используйте налоговый вычет чтобы погасить ипотеку досрочно.
              Размер налогового вычета составляетне более 13% от своего
              официального годового дохода.
            </Info>
            <SecondHeading>Ваша зарплата в месяц</SecondHeading>
            <MoneyInput setNumber={setSalary} error={error} />
            <TextButton
              onClick={() => {
                if(salary > 12000){

                  setTaxReductionPerYear(DoMath(salary));
                  setError('')
                } else {
                  setError('Сумма слишком маленькая')
                  setTaxReductionPerYear([])
                }
              }}
            >
              Рассчитать
            </TextButton>

            {taxReductionPerYear.length > 0 && (
              <>
                <TaxReductionHeading>
                  Итого можете внести в качестве досрочных:
                </TaxReductionHeading>
                <ScrollContainer>
                  {taxReductionPerYear.map((taxReduction, i) => {
                    return (
                      <>
                        <TaxReductionRow>
                          <Checkbox />
                          <span>
                            {FormatValue(taxReduction)} рублей{" "}
                            <GreyText>в {i + 1}-ый год</GreyText>
                          </span>
                        </TaxReductionRow>
                        <HR />
                      </>
                    );
                  })}
                </ScrollContainer>
              </>
            )}
            <FlwxRow>
              <span>Что уменьшаем?</span>
              <FlwxRow>
                <Tag active>Платёж</Tag>
                <Tag>Срок</Tag>
              </FlwxRow>
            </FlwxRow>
            <Button primary>Добавить</Button>
          </FormContainer>
        </Popup>
      )}
    </AppContainer>
  );
}

const ScrollContainer = styled.div`
  max-height: 280px;
  overflow-y: scroll;
`;

const GreyText = styled.span`
  color: #808080;
`;

const SecondHeading = styled.span`
  font-family: Lab Grotesque;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  /* Black 000 */

  color: #000000;
`;

const TaxReductionHeading = styled(SecondHeading)``;

const HR = styled.hr`
  background: #dfe3e6;
  width: 100%;
  border: none;
  height: 1px;
  margin-top: 16px;
`;

const FormatValue = (value: number) => {
  const string = String(value);
  const chars = string.split("");
  const charsBy3 = chars.reverse().reduce((all, one, i) => {
    const ch = Math.floor(i / 3);
    all[ch] = ([] as string[]).concat(all[ch] || ([] as string[]), one);
    return all;
  }, [] as string[][]);
  const chunksBy3 = charsBy3.map((arr) => arr.reverse().join(""));
  return chunksBy3.reverse().join(" ");
};

const MoneyInput = (props: { setNumber: (value: number) => void, error?: string }) => {
  const [value, setValue] = useState(0);
  props.setNumber(value);
  const [focused, setFocused] = useState(false);
  const formated = FormatValue(value) + (focused ? "" : " ₽");
  return (
    <Input
    error={props.error}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Введите данные"
      value={formated}
      onChange={(newValue) => {
        console.log(newValue)
        const value = newValue.replace(/[^0-9]+/gi, "");
        setValue(Number(value));
      }}
    />
  );
};

const TaxReductionRow = styled.span`
  display: flex;
  gap: 11px;
  margin-top: 16px;
`;

const FlwxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Heading = styled.h1`
  font-family: Lab Grotesque;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  /* identical to box height, or 143% */
  margin: 0;

  /* Black 000 */

  color: #000000;
`;

const Info = styled.p`
  font-family: Lab Grotesque;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */

  /* Gray text */

  color: #808080;
`;

export default App;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;

  display: grid;
  place-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${Button} {
    margin-top: 40px;
    @media (max-width: 552px) {
      margin-top: auto;
    }
  }

  ${FlwxRow} {
    margin-top: 24px;
  }

  ${TextButton} {
    margin-top: 8px;
    align-self: flex-start;
  }

  ${Input} {
    margin-top: 8px;
  }

  ${TaxReductionHeading} {
    margin-top: 16px;
  }
`;
