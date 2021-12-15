```jsx
<View activePanel="progress">
  <Panel id="progress">
    <PanelHeader>SegmentedControl</PanelHeader>
    <Group>
      <FormItem top="Пол">
        <SegmentedControl
          options={[
            {
              label: "Мужской",
              value: "male",
            },
            {
              label: "Женский",
              value: "female",
            },
            {
              label: "N/a",
              value: "nope",
            },
          ]}
        />
      </FormItem>
    </Group>
  </Panel>
</View>
```
